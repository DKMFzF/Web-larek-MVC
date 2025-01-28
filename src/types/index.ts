export type CategoryType =
    | 'другое'
    | 'софт-скил'
    | 'дополнительное'
    | 'кнопка'
    | 'хард-скил';

export type CategoryMapping = {
    [Key in CategoryType]: string;
};

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    price: number | null;
    selected: boolean;
}

// export interface IProductSettings {
//     id: string;
//     title: string;
//     image: string;
//     category: string;
//     description: string;
//     price: number | null;
//     selected: boolean;
// }

// заполнения данных пользователя
export type TPaymentMethod = 'card' | 'cash' | null;
export interface IOrderMethod {
    payment: string;
    address: string;
}

export interface IContacts extends IOrderMethod {
    email: string;
    phone: string;
}

export interface IOrder extends IContacts {
    total: number;
    items: string[];
}

// такой ответ ждём от API
export interface IOrderResult {
    id: string;
    total: number;
}

// APi
export interface IProductAPI {
    getProducts: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	orderProducts: (order: IOrder) => Promise<IOrderResult[]>;
}

// все модальные окна страницы
// export enum EnumAppStateModals {
//     PRIVIEW_PRODUCT = 'modal:priviewProduct',
//     BASKET = 'modal:basket',
// 	ORDER = 'modal:order',
// 	CONTACTS = 'modal:contacts',
// 	SUCCESS = 'modal:success',
// 	NONE = 'modal:none',
// }

// // Какие изменения состояния приложения могут происходить
// export enum EnumAppStateChanges {
// 	PRODUCTS = 'change:product',
// 	MODAL = 'change:modal',
// 	MODAL_MESSAGE = 'change:modalMessage',
// 	SELECTED_PRODUCT = 'change:selectedProduct',
//     BASKET = 'change:basket',
//     ORDER = 'change:order',
//     CONTACTS = 'change:contacts',
// }

// Типизация ошибки
export type IFormErrors = Partial<Record<keyof IOrder, string>>;

// состояние приложения
export interface IAppState {
    products: IProduct[];
    basket: IProduct[];
    order: IOrder;
    formError: IFormErrors;

    // method basket
    addProductInBasket(product: IProduct): void;
    deleteProductInBasket(id: string): void;
    getAmountProductInBasket(): number;
    getTotalPricteInBasket(): number;

    // method order
    setItems(): void; // Метод для добавления ID товаров в корзине в поле items для order
    setOrderField(): void;
    validateContacts(): boolean;
    validateOrder(): boolean;
    
    // dumping methods
    clearBasket(): void;
    refreshOrder(): boolean;
    setProducts(items: IProduct[]): void;
    resetSelected(): void;
}

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}
