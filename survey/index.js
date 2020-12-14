
Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
Survey
    .StylesManager
    .applyTheme("bootstrapmaterial");

var json = {
    pages: [
        {
            questions: [
                {

                }, {
                    type: "rating",
                    name: "満足度",
                    title: "How satisfied are you with this website?",
                    mininumRateDescription: "Not Satisfied",
                    maximumRateDescription: "Completely satisfied"
                }, {
                    type: "rating",
                    name: "recommend friends",
                    visibleIf: "{満足度} > 2",
                    title: "How likely are you to recommend this website to a friend or co-worker?",
                    mininumRateDescription: "Will not recommend",
                    maximumRateDescription: "I will recommend"
                }, {
                    type: "comment",
                    name: "suggestions",
                    title: "What would make you more satisfied with this website"
                }
            ]
        }, 
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "This is what you submitted:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});