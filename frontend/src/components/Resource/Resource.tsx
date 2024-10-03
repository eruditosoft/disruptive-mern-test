import {Resource} from "@/mapper/Resource.ts";
import {FormattedMessage} from "react-intl";

export default function ResourceComponent({
                                              name,
                                              category,
                                              author,
                                              createdAt,
                                          }: Resource) {
    return (
        <div

        >
      <span style={{display: "block", fontSize: "2rem", textAlign: "center"}}>
        {name}
      </span>
            <span
                style={{display: "block", fontSize: "1.5rem", margin: "0.5rem 0"}}
            >
        <FormattedMessage id="category"/>: {category}
      </span>
            <span style={{display: "block", fontSize: "1.5rem", margin: '0.5rem 0'}}>
        <FormattedMessage id="author"/>: {author}
      </span>
            <span style={{display: "block", fontSize: "1.2rem", margin: '0.5rem 0'}}>
        <FormattedMessage id="creation.date"/>: {createdAt}
      </span>
        </div>
    );
}
