import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import AuthenticationReducer from "./Authentication/reducer";
import EventCategoryReducer from "./EventCategory/reducer";
import MyEventsReducer from "./MyEvents/reducer";
import EventDetailsReducer from "./EventDetails/reducer";
import CountryReducer from "./Country/reducer";
import EventRegistrationReducer from "./EventRegistration/reducer";
import SearchReducer from "./Search/reducer";

const rootReducer = combineReducers({
    AuthenticationReducer,
    EventCategoryReducer,
    MyEventsReducer,
    EventDetailsReducer,
    CountryReducer,
    EventRegistrationReducer,
    SearchReducer

});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
