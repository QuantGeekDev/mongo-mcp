import { db } from "../../mongodb/client.js";
import { BaseTool, ToolParams } from "../base/tool.js";
import { ObjectId } from "mongodb";

export interface FindParams extends ToolParams {
  collection: string;
  filter?: Record<string, unknown>;
  limit?: number;
  projection?: Record<string, unknown>;
}

export class FindTool extends BaseTool<FindParams> {
  name = "find";
  description = "Query documents in a collection using MongoDB query syntax";
  inputSchema = {
    type: "object" as const,
    properties: {
      collection: {
        type: "string",
        description: "Name of the collection to query",
      },
      filter: {
        type: "object",
        description: "MongoDB query filter",
        default: {},
      },
      limit: {
        type: "number",
        description: "Maximum documents to return",
        default: 10,
        minimum: 1,
        maximum: 1000,
      },
      projection: {
        type: "object",
        description: "Fields to include/exclude",
        default: {},
      },
    },
    required: ["collection"],
  };

  /**
    * Recursively converts filter fields ending with "Id" or "_id" that match the ObjectId format
    * (24-character hexadecimal strings) into MongoDB ObjectId instances.
    *
    * @param filter - The original MongoDB query filter object.
    * @returns A new filter object with applicable string fields converted to ObjectId instances.
   */
  private convertFilterFields(filter: Record<string, unknown>): Record<string, unknown> {
    const convertedFilter = { ...filter };

    function convertIfObjectId(obj: Record<string, unknown>) {
      for (const [key, value] of Object.entries(obj)) {
        if (
          (key.endsWith("Id") || key.endsWith("_id")) &&
          typeof value === "string" &&
          /^[0-9a-fA-F]{24}$/.test(value)
        ) {
          try {
            obj[key] = new ObjectId(value);
          } catch (err) {
            console.error(`Invalid ObjectId for field "${key}": ${value}`);
          }
        } else if (value && typeof value === "object") {
          convertIfObjectId(value as Record<string, unknown>);
        }
      }
    }

    convertIfObjectId(convertedFilter);
    return convertedFilter;
  }

  async execute(params: FindParams) {
    try {
      const collection = this.validateCollection(params.collection);
      
      // Convert applicable fields in the filter to ObjectId
      let filter = params.filter ? { ...params.filter } : {};
      filter = this.convertFilterFields(filter);

      const results = await db
        .collection(collection)
        .find(filter)
        .project(params.projection || {})
        .limit(Math.min(params.limit || 10, 1000))
        .toArray();

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(results, null, 2) },
        ],
        isError: false,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
