
Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
Survey
    .StylesManager
    .applyTheme("bootstrapmaterial");

const fs = require('fs')

var json = {
    pages: [
        {
            questions: [
                {

                }, {
                    type: "rating",
                    name: "satisfaction",
                    title: "How satisfied are you with this website?",
                    mininumRateDescription: "Not Satisfied",
                    maximumRateDescription: "Completely satisfied"
                }, {
                    type: "rating",
                    name: "recommend friends",
                    visibleIf: "{satisfaction} > 2",
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
        fs.writeFile('./response.txt', result.data, (err) => { 
            if (err) throw err; 
        }) 
        document
            .querySelector('#surveyResult')
            .textContent = "This is what you submitted:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});