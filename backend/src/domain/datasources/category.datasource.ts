import {CategoryRegisterDto} from '@domain/dtos/category/category.register.dto';
import {CategoryEntity} from '@domain/entity/category/category.entity';
import {QueryDto} from "@domain/dtos/query/query.dto ";
import {StringAny} from "@shared/domain/KeyValue";


export abstract class CategoryDatasource {
    abstract update(id: string, body: StringAny): Promise<CategoryEntity>;

    abstract delete(id: string): Promise<void>;

    abstract register(categoryRegister: CategoryRegisterDto, userId: string): Promise<CategoryEntity>;

    abstract findAll(query: QueryDto): Promise<CategoryEntity[]>;

    abstract findById(categoryId: string): Promise<CategoryEntity>;

}