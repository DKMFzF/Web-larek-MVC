import { EnumAppStateModals, IAppState } from "../../types/components/model/AppState";
import { IMainSettings } from "../../types/components/view/screen/Main";
import { Controller } from "../base/Controller";

export class MainController extends Controller<IAppState> implements IMainSettings {
    onOpenBasket = () => {
        this.model.openModal(EnumAppStateModals.BASKET);
    }

    onOpenProduct = () => {
        this.model.openModal(EnumAppStateModals.CARD);
    }
}
