import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm';
import { PaginatedResult, PaginationOptions } from './pagination.interface';

@Injectable()
export class PaginationProvider {
  
  public async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    options: PaginationOptions,
    searchOptions?: FindManyOptions<T>,
  ): Promise<PaginatedResult<T>> {
    const page = Number(options.page) > 0 ? Number(options.page) : 1;
    const limit = Number(options.limit) > 0 ? Number(options.limit) : 10;
    const skip = (page - 1) * limit;

    // Merge pagination constraints into any existing find options (where clause, relations, etc.)
    const [data, totalItems] = await repository.findAndCount({
      ...searchOptions,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);

    const result: PaginatedResult<T> = {
      data,
      meta: {
        itemCount: data.length,
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };

    // If a base route/URL is provided, generate helper navigation links
    if (options.route) {
      const baseUrl = options.route;
      result.links = {
        first: `${baseUrl}?page=1&limit=${limit}`,
        previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : '',
        next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : '',
        last: `${baseUrl}?page=${totalPages}&limit=${limit}`,
      };
    }

    return result;
  }
}