import { InferQueryOutput } from "@backend/utils/router";
import { BasicInfo, Node } from "@prisma/client";
import { createContext, ReactNode, useContext, useReducer } from "react";
type UserData = Required<InferQueryOutput<"data.fetch">>;
export interface UserInfo {
  title: string;
  description: string;
  imageURL: string;
}
interface UserDataContextActions {
  updateData: (payload: UserData) => void;
  updatePreviewNodes: (payload: Node[]) => void;
  updateDataNodes: (payload: Node[]) => void;
  updatePreviewInfo: (payload: UserInfo) => void;
  updateDataInfo: (payload: UserInfo) => void;
}
interface UserDataValue {
  loaded: boolean;
  data: UserData;
  previewData: UserData;
}
type UserDataContext = UserDataValue & UserDataContextActions;
const initialUserDataState: UserDataContext = {
  data: {
    username: "",
    basicInfo: {
      description: "",
      id: "",
      imageURL: null,
      nodes: [],
      title: "",
      username: "",
      userid: "",
    },
  },
  previewData: {
    username: "",
    basicInfo: {
      description: "",
      id: "",
      imageURL: null,
      nodes: [],
      title: "",
      username: "",
      userid: "",
    },
  },
  loaded: false,
  updateData: () => {},
  updatePreviewNodes: () => {},
  updateDataNodes: () => {},
  updatePreviewInfo: () => {},
  updateDataInfo: () => {},
};
enum UserDataActionType {
  UPDATE,
  UPDATE_PREVIEW_NODES,
  UPDATE_DATA_NODES,
  UPDATE_PREVIEW_INFO,
  UPDATE_DATA_INFO,
}

interface UserDataAction {
  type: UserDataActionType;
  payload: any;
}
const DataContext = createContext(initialUserDataState);
function dataReducer(
  state: UserDataValue,
  action: UserDataAction
): UserDataValue {
  const { type, payload } = action;
  switch (type) {
    case UserDataActionType.UPDATE:
      return {
        previewData: {
          ...payload,
        },
        loaded: true,
        data: {
          ...payload,
        },
      };
    case UserDataActionType.UPDATE_PREVIEW_NODES:
      return {
        ...state,
        previewData: {
          ...state.previewData,
          basicInfo: {
            ...state.previewData.basicInfo!,
            nodes: payload,
          },
        },
      };
    case UserDataActionType.UPDATE_DATA_NODES:
      return {
        ...state,
        data: {
          ...state.data,
          basicInfo: {
            ...state.data.basicInfo!,
            nodes: payload,
          },
        },
      };
    case UserDataActionType.UPDATE_PREVIEW_INFO:
      return {
        ...state,
        previewData: {
          ...state.data,
          basicInfo: {
            ...state.previewData.basicInfo!,
            title: payload.title,
            description: payload.description,
            imageURL: payload.imageURL,
          },
        },
      };
    case UserDataActionType.UPDATE_DATA_INFO:
      return {
        ...state,
        data: {
          ...state.data,
          basicInfo: {
            ...state.data.basicInfo!,
            title: payload.title,
            description: payload.description,
            imageURL: payload.imageURL,
          },
        },
      };
    default:
      return state;
  }
}
export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialUserDataState);
  const value = {
    ...state,
    updateData: (payload: UserData) =>
      dispatch({ type: UserDataActionType.UPDATE, payload }),
    updatePreviewNodes: (payload: Node[]) =>
      dispatch({ type: UserDataActionType.UPDATE_PREVIEW_NODES, payload }),
    updateDataNodes: (payload: Node[]) =>
      dispatch({ type: UserDataActionType.UPDATE_DATA_NODES, payload }),
    updatePreviewInfo: (payload: UserInfo) =>
      dispatch({ type: UserDataActionType.UPDATE_PREVIEW_INFO, payload }),
    updateDataInfo: (payload: UserInfo) =>
      dispatch({ type: UserDataActionType.UPDATE_DATA_INFO, payload }),
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
