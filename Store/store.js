import { configureStore } from "@reduxjs/toolkit";
import Cartslice from "./Cartslice";

const store=configureStore({
    reducer:{
        Cart:Cartslice
    }
})
export default store