import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const initialState = {
  Alls: [],
  Dones: [],
  inprogresss: [],
  Actives: "Alls",
  currently: [],
};

const Cartslice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    All(state, action) {
      state.Alls = [...state.Alls, action.payload];
      state.inprogresss = [...state.inprogresss, action.payload];
    },

    Done(state, action) {
      state.Dones = [...state.Dones, action.payload];
      state.inprogresss =
        state.inprogresss?.length === 0
          ? state.Alls.filter((el) => el !== action.payload)
          : state.inprogresss.filter((el) => el !== action.payload);
    },
    inprogress(state) {
      state.inprogresss = state.Alls;
    },
    Activity(state, action) {
      state.Actives = action.payload;
      if (state.Actives === "Alls") state.currently = state.Alls;
      if (state.Actives === "Done") state.currently = state.Dones;
      if (state.Actives === "inprogrss") state.currently = state.inprogresss;
    },
    Delelte(state, action) {
      console.log(state)
      state.Dones = state.Dones.filter((el) => el !== action.payload);
      state.inprogresss = state.inprogresss.filter(
        (el) => el !== action.payload
      );
      state.Alls = state.Alls.filter((el) => el !== action.payload);
    },
    Currentlyvisinle(state, action) {
      state.currentdispayed = action.payload;
    },
    intaldispatch: {
      prepare(data) {
        return {
          payload: {
            all: data.all,
            Inprogress: data.Inprogress,
            done: data.done,
          },
        };
      },
      reducer(state, action) {
        state.Alls = action.payload.all;
        state.inprogresss = action.payload.Inprogress;
        state.Dones = action.payload.done;
      },
    },
  },
});

export const { All, inprogress, Done, Activity, Delelte, Currentlyvisinle,intaldispatch } =
  Cartslice.actions;

export default Cartslice.reducer;
