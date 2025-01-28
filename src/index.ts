import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductAPI } from './components/ProductsAPI';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppState } from './components/AppData';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { IProduct } from './types';
import { ProductItem } from './components/Card';

const api = new ProductAPI(CDN_URL, API_URL);
const events = new EventEmitter();

// шаблоны
const productsTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success')

// модель данных приложения
const appData = new AppState({}, events);

// глобальные контейнеры
const main = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Получаем данные с сервера
api
    .getProducts()
    .then(res => appData.setProducts(res as IProduct[]))
    .catch(err => console.log(err));

// Изменяем каталог
events.on('items:changed', () => {
    main.products = appData.products.map(item => {
        const product = new ProductItem(cloneTemplate(productsTemplate), {
            onClick: () => {
                events.emit('card:toBasket', item);
            }
        });
        console.log(item.image)
        return product.render({
            id: item.id,
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price
        }); 
    })
});
