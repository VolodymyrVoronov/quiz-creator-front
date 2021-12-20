import { observable, computed, action } from "mobx";

interface IQuiz {}

class quizzesStore {
  @observable quizzes: IQuiz = [];
  @observable isLoading: boolean = false;
  @observable isSignInForm: boolean | undefined = undefined;

  @computed
  get getAllQuizzes() {
    return this.quizzes;
  }

  @computed
  get getTypeOfForm() {
    return this.isSignInForm;
  }

  @action.bound
  setTypeOfAuthForm = (flag: boolean) => {
    this.isSignInForm = flag;
  };
}

export default new quizzesStore();
