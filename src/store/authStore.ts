import { observable, computed, action } from "mobx";

class authStore {
  @observable isAuthorizing: boolean = false;
  @observable isSignInForm: boolean | undefined = undefined;

  @computed
  get getTypeOfForm() {
    return this.isSignInForm;
  }

  @action.bound
  setTypeOfAuthForm = (flag: boolean) => {
    this.isSignInForm = flag;
  };
}

export default new authStore();
