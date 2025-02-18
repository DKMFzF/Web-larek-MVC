import { Api, ApiListResponse } from '../base/api';
import { IProduct, IOrder, IOrderResult } from '../../types/index';

export interface IProductAPI {
	getProducts: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

const enum EnumProductAPIPaths {
	PATH_PRODUCTS = '/product',
	PATH_PRODUCT = '/product/',
	PATH_ORDER = '/order',
}

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// загрузка всех продуктов
	async getProducts(): Promise<IProduct[]> {
		const data = (await this.get(
			EnumProductAPIPaths.PATH_PRODUCTS
		)) as ApiListResponse<IProduct>;
		// изначально в image идёт .svg, меняем на .png + добалвляем сслыку
		data.items.map(
			(product) =>
				(product.image = `${this.cdn}${product.image.replace(
					/\.svg$/,
					'.png'
				)}`)
		);
		return data.items;
	}

	// Загрузка продукта по id
	async getProduct(id: string): Promise<IProduct> {
		const data = await this.get(`${EnumProductAPIPaths.PATH_PRODUCT}${id}`);
		return data as IProduct;
	}

	// загрузка всех order на сервер
	async orderProducts(order: IOrder): Promise<IOrderResult> {
		const data = (await this.post(
			EnumProductAPIPaths.PATH_ORDER,
			order
		)) as IOrderResult;
		return data;
	}
}
