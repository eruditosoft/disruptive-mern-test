import {CategoryDatasource} from '@domain/datasources/category.datasource';
import {CategoryRepository} from '@domain/repositories/category.repository';
import {CategoryRegisterDto} from '@domain/dtos/category/category.register.dto';
import {CategoryEntity} from '@domain/entity/category/category.entity';
import {QueryDto} from "@domain/dtos/query/query.dto";
import {StringAny} from "@shared/domain/KeyValue";

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly datasource: CategoryDatasource) {
    }

    update(id: string, body: StringAny): Promise<CategoryEntity> {
        return this.datasource.update(id, body);
    }

    delete(id: string): Promise<void> {
        return this.datasource.delete(id);
    }

    findAll(query: QueryDto): Promise<CategoryEntity[]> {
        return this.datasource.findAll(query);
    }

    register(categoryRegister: CategoryRegisterDto, userId: string): Promise<CategoryEntity> {
        return this.datasource.register(categoryRegister, userId);
    }

    findById(categoryId: string): Promise<CategoryEntity> {
        return this.datasource.findById(categoryId);
    }
}