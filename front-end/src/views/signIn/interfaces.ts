export interface ActionFunctionParams {
    email: string;
    alias?: string;
}

export type ToCallFunction = ({email, alias}: ActionFunctionParams) => void

export interface SignInProps {
    toBack?: () => void,
    toCall: ToCallFunction;
}
