(function (homeController) {

  homeController.init = function (app) {

    app.get("/", function (req, res) {
        res.render("govukindex", { title: "Health and Safety issue reporting tool" });
    });

  }

})(module.exports);