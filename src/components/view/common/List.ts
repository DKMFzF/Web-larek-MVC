import {
    IListData,
    IListSettings,
    TElementsMap
} from '../../../types/components/view/common/List';
import { IItemData } from "../../../types/components/view/common/List";
import { View } from "../../base/View";

// универсальный класс списка
export class ListView<T extends IItemData> extends View<IListData<T>, IListSettings<T>> {
    // Сохраняем элементы в объекте, где ключ - id элемента
    protected _elements: TElementsMap;

    /**
	 * Устанавливаем активный элемент
	 */
	setActiveElement(element: HTMLElement) {
		const elements = Object.values(this._elements);
		if (elements.includes(element)) {
			elements.map((element) =>
				element.classList.remove(this.settings.activeItemClass)
			);
			element.classList.add(this.settings.activeItemClass);
		}
	}

	/**
	 * Устанавливаем активный элемент по id
	 */
	setActiveItem(id: string) {
		if (this._elements[id]) {
			this.setActiveElement(this._elements[id]);
		}
	}

	/**
	 * Обновляем отображение списка элементов
	 */
	set items(items: T[]) {
		this._elements = items.reduce<TElementsMap>((result, item) => {
			// Копируем заранее настроенное отображение
			console.log(result);
			const el = this.settings.item.copy();
			console.log(el);
			// console.log(this.settings.item.copy());
			// Добавляем класс элемента
			el.element.classList.add(this.settings.itemClass);
			// Заполняем нужными данными и сохраняем в объекте
			// console.log(item);
			console.log(el);
			result[item.id] = el.render(item);
			return result;
		}, {});
		this.setValue(this.element, Object.values(this._elements));
	}
}
