const selectSubjectGraphsElem = document.querySelector("#select-subject-graphs");
const selectSubjectAverageElem = document.querySelector("#select-subject-average");

const divResults = document.querySelector("#results-tests");
let resultsTests = [];
let counterTests = 1
let appraisals = [];
let myChart;

firebase.database().ref(`school${user.school}/tests/${user.klass}`).on('value', (snapshot) => {
    for (let key in snapshot.val()) {
        firebase.database().ref(`school${user.school}/tests/${user.klass}/${key}/results`).on('child_added', (data) => {
            const appraisal = data.val().appraisal;
            const result = data.val().result;
            const idTest = data.val().idTest;

            divResults.innerHTML += `
                <tr id="resultTest${idTest}">
                    <th scope="row">${counterTests++}</th>
                    <td>${result[0].test_subject}</td>
                    <td>${result[0].test_theme}</td>
                    <td>${result[0].date}</td>
                    <td id="appraisal">
                        <div id="appraisalDiv${idTest}" class="appraisal alert">
                            <p id="text-appraisal">${appraisal}</p>
                        </div>
                    </td>
                </tr>
            `;

            switch (appraisal) {
                case 2: document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-danger"; break;
                case 3: document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-warning"; break;
                case 4: document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-primary"; break;
                case 5: document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-success"; break;
            }

            appraisals.push({
                subject: result[0].test_subject,
                appraisal: appraisal
            });
        });
    }

    appraisals.forEach((result) => {
        selectSubjectGraphsElem.innerHTML += `<option value="${result.subject}">${result.subject}</option>`;
        selectSubjectAverageElem.innerHTML += `<option value="${result.subject}">${result.subject}</option>`;
    });
});

function createGraphs(subject) {
    try {
        myChart.destroy();
    } catch { console.log("chart hasn't been created yet"); }

    const labels = Array.from(Array(31).keys());
    let appraisals_subject = [];

    appraisals.forEach((result) => {
        if (result.subject == subject) {
            appraisals_subject.push(result.appraisal);
        }
    });

    appraisals_subject = filterArray(appraisals_subject);

    const data = {
        labels: labels,
        datasets: [{
            label: subject,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: appraisals_subject
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            parsing: {
                xAxisKey: 'subject',
                yAxisKey: 'appraisals_subject'
            }
        }
    };
    
    myChart = new Chart(
        document.getElementById('graphs'), config
    );
}

function averageScore(subject) {
    document.querySelector('.all-appraisals').innerHTML = '';
    document.querySelector('.average-score').innerHTML = '';

    let appraisals_subject = [];

    appraisals.forEach((result) => {
        if (result.subject == subject)
            appraisals_subject.push(result.appraisal);
    });

    appraisals_subject = filterArray(appraisals_subject);
    let averageScoreAppraisals = (appraisals_subject.reduce((a,b) => { return (a + b) } )) / appraisals_subject.length;
    
    appraisals_subject.forEach((appraisal) => {
        document.querySelector('.all-appraisals').innerHTML += `<span class="badge bg-primary">${appraisal}</span>`;    
    });

    document.querySelector('.average-score').innerHTML = `<span class="badge bg-success">${averageScoreAppraisals}</span>`;
}

function filterArray(array) {
    let filteredArray = array.filter((item, index) => {
        return array.indexOf(item) === index
    });

    return filteredArray;
}

