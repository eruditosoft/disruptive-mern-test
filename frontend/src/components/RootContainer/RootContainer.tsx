import {ChildrenProps} from "@/data/props.ts";

export default function RootContainer({children}: ChildrenProps) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}
