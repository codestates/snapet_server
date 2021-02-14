const request = require("request");
const fs = require("fs");

module.exports = async (req, res) => {
    const image = req.image;

    request.post(
    {
        url: "https://api.remove.bg/v1.0/removebg",
        formData: {
        image_file: image,
        size: "auto",
        },
        headers: {
        "X-Api-Key": "BmvCosLAaUHRXWku6ZfwcAJf",
        },
        encoding: null,
    },
    function (error, response, body) {
        if (error) return console.error("Request failed:", error);
        if (response.statusCode != 200) {
        return console.error(
            "Error:",
            response.statusCode,
            body.toString("utf8")
        );
        } else {
        res.send(fs.writeFileSync("no-bg.png", body));
        }
    }
    );

    res.status(400).send("error");
};