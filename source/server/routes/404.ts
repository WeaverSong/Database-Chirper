import _ from '../NotQuiteJSX';
export default function (request: string | { url: string }) {

    if (typeof request !== "string") {
        let url = request.url;
        return (
            _.html(
                _.head(
                    _.title("Cheep!"),
                    _.style({
                        body: {
                            "width": "100vw",
                            "height": "100vh",
                            "margin": 0
                        },
                        div: {
                            "display": "flex",
                            "flex-direction": "column",
                            "justify-content": "center",
                            "width": "100%",
                            "height": "100%"
                        },
                        h1: {
                            "padding": "auto",
                            "text-align": "center"
                        },
                        span: {
                            "background-color": "#e3e166"
                        }
                    })
                ),
                _.body(
                    _.div(
                        _.h1(`Page not found.`),
                        _.h1(`Cheep! We couldn't find ${_.span(url)}`)
                    )
                )
            ));
    }

    return (
        _.html(
            _.head(
                _.title("Cheep!"),
                _.style({
                    body: {
                        "width": "100vw",
                        "height": "100vh",
                        "margin": 0
                    },
                    div: {
                        "display": "flex",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "width": "100%",
                        "height": "100%"
                    },
                    h1: {
                        "padding": "auto",
                        "text-align": "center"
                    },
                    span: {
                        "background-color": "#e3e166"
                    }
                })
            ),
            _.body(
                _.div(
                    _.h1(`Cheep! ${request}`)
                )
            )
        )
    );
};