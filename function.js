PageStates = {
    "bookworks": `<style> ._Content_fyjwi_7 { display: flex; justify-content: center; } .block { width: 95%; height: fit-content; overflow-y: scroll; } .block-title { font-size: x-large; font-weight: bold; } .block-title:not(:first-of-type) { margin-top: 20px; } .block-shell { width: 100%; display: flex; flex-direction: column; align-items: center; } .block-inner { width: 95%; } .block-inner-text { background-color: var(--colours-transparent-darken); border: 2px dashed var(--colours-interactable); border-top: none; border-bottom: none; padding: 15px; padding-top: 5px; padding-left: 25px; } .block-inner-title { background-color: var(--colours-transparent-darken); border: 2px dashed var(--colours-interactable); border-top: none; border-bottom: none; font-weight: bold; padding: 15px; padding-bottom: 5px; } .block-inner:nth-of-type(1) .block-inner-title { border: 2px dashed var(--colours-interactable); border-bottom: none; border-top-left-radius: 10px; border-top-right-radius: 10px; } .block-inner:nth-last-child(1) .block-inner-text { border: 2px dashed var(--colours-interactable); border-top: none; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; margin-bottom: 5px; } </style> <div class="_Content_fyjwi_7"> <!-- ADD CONTENT HERE --> <div class="block"> </div> </div>`,
    "settings": '<style> ._Content_fyjwi_7 { display: flex; align-items: center; flex-direction: column; } .setting { padding: 20px; color: var(--colours-text-body); width: 90%; } legend { font-weight: bold; font-size: larger; } .setting-title { font-size: large; margin-right: 5px; } </style> <div class="_Content_fyjwi_7"> <!-- ADD CONTENT HERE --> <br><br> <fieldset class="setting"> <legend>Features:</legend> <div> <label for="RemoveCompletedHomework" class="setting-title">Remove Completed Homeworks</label> <input id="RemoveCompletedHomework" type="checkbox"> </div><br> <div> <label for="AddUserSelect" class="setting-title">Selectable Text</label> <input id="AddUserSelect" type="checkbox"> </div><br> <div> <label for="Timers" class="setting-title">Timers</label> <input id="Timers" type="checkbox"> </div><br> <div> <label for="NameMuffler" class="setting-title">Change Username</label> <input type="text" placeholder="Leave blank to turn off" id="NameMuffler"> </div> </fieldset> <br><br> <fieldset class="setting"> <legend>Themes:</legend> <div> <label for="light" class="setting-title">Light</label> <input id="light" type="checkbox"> </div><br> <div> <label for="dusk" class="setting-title">Dusk</label> <input id="dusk" type="checkbox"> </div> </fieldset> </div>'
}
function RemoveCompletedHomework() {
    if (window.location.toString().includes("homework")) {
        let AllHomeworks = document.querySelector("._AccordionRoot_9fvag_3").children
        for (let i = 0; i < AllHomeworks.length; i++) {
            let Child = AllHomeworks[i]
            if (Child.classList.contains("_Completed_9fvag_50") || Child.textContent.includes("Introducing Sparx Maths")) {
                Child.style.display = "none"
            }
        }
        AllHomeworks[0].firstChild.firstChild.click()
    }
}
function AddUserSelect() {
    let NewStyle = document.createElement("style")
    NewStyle.innerHTML = `
    :root {
        --user-select-accessibility-setting: default !important;
    }
    ._TextElement_1luff_67, span {
        cursor: text !important;
    }
    `
    document.head.appendChild(NewStyle)
}
function RemoveUselessMenuItems() {
    try {
        document.querySelector('._Link_tgmt4_71[href="/student/rewards"]').remove()
        document.querySelector('._Link_tgmt4_71[href="/student/feedback"]').remove()
    }
    catch{}
}
var OriginalURL
function AddMenuItem(title, path) {
    NewA = document.createElement("a")
    NewA.classList.add("_Link_tgmt4_71")
    NewA.setAttribute("PageState", path)
    if (path == "homework") { NewA.href = "https://www.sparxmaths.uk/student/homework" }
    else {
        NewA.onclick = function() {
            AddPseudoPages()
            if (path == "before") {
                var newUrl = OriginalURL;
                history.pushState({}, '', newUrl);
            }
            else {
                var newUrl = 'https://www.sparxmaths.uk/student/' + path;
                history.pushState({}, '', newUrl);
            }
    
            let PseudoPages = document.querySelectorAll("#bookworks, #settings, #before, #back")
            for (let i = 0; i < PseudoPages.length; i++) {
                let CurrentPage = PseudoPages[i]
    
                if (CurrentPage.style.display != "none") { CurrentPage.style.display = "none" }
                if (CurrentPage.id == path) { CurrentPage.style.display = "flex" }
            }
    
            if (path == "bookworks") {
                document.getElementById("bookworks").querySelector(".block").innerHTML = ""
                GetBookworks()
            }
            else if (path == "settings") {
                SettingsFunctions()
            }
        }
    }
    document.querySelector("._BannerLeft_4fjt9_20 ._SMLogo_4fjt9_40").onclick = function(){ window.open("https://www.sparxmaths.uk/student/homework", "_self") }
    try {
        document.querySelector("._BannerLeft_4fjt9_20 ._BackButton_1iso5_1").onclick = function(){ window.open("https://www.sparxmaths.uk/student/homework", "_self") }
    }
    catch{}

    NewDiv = document.createElement("div")
    NewDiv.textContent = title
    NewDiv.setAttribute("role", "menuitem")
    NewDiv.setAttribute("tab-index", "-1")
    NewDiv.setAttribute("data-orientation", "verticle")
    NewDiv.classList.add("_DropdownMenuItem_tgmt4_59")

    NewA.appendChild(NewDiv)
    document.querySelector("._DropdownMenuContent_tgmt4_31").insertBefore(NewA, (document.querySelectorAll("._DropdownMenuItem_tgmt4_59"))[document.querySelectorAll("._DropdownMenuItem_tgmt4_59").length- 1])

    RemoveUselessMenuItems()
}
function UpdateUIcolors(Values) {
    const UIlist = {
        "light": [
            "rgba(46, 60, 113, 1)",
            "rgba(238, 144, 3, 1)",
            "rgba(58, 128, 231, 1)",
            "rgba(75, 160, 254, 1)",
            "rgba(223, 236, 248, 1)",
            "rgba(238, 244, 254, 1)",
            "sepia(1) hue-rotate(0deg) saturate(0)",
            "#1a1a1a",
            "#f5f5f5",
            "#00000010",
            "#00000029",
            "#0000005c",
        ],
        "dusk": [
            "#030303",
            "#3b3b3b",
            "#5e5e5e",
            "#2e2e2e",
            "#bfbfbf",
            "#e3e3e3",
            "sepia(1) hue-rotate(0deg) saturate(0)",
            "#f5f5f5",
            "#1a1a1a",
            "#00000010",
            "#00000029",
            "#0000005c",
        ]
    }

    let NewStyleText = `
    :root {
        --raw-darkest: ${UIlist[Values][0]};
        --raw-dark: ${UIlist[Values][1]};
        --raw-medium: ${UIlist[Values][2]};
        --raw-light: ${UIlist[Values][3]};
        --raw-lightest: ${UIlist[Values][4]};
        --raw-shine: ${UIlist[Values][5]};
        --tint: ${UIlist[Values][6]};
        --text-light: ${UIlist[Values][7]};
        --text-dark: ${UIlist[Values][8]};
        --shadow-small: ${UIlist[Values][9]};
        --shadow-medium: ${UIlist[Values][10]};
        --shadow-large: ${UIlist[Values][11]};
    }
    `
    let NewStyle = document.createElement("style")
    NewStyle.innerHTML = NewStyleText

    document.head.appendChild(NewStyle)
}
let CurrentUI = localStorage.getItem("theme") || "ERROR"
if (CurrentUI == "ERROR") {
    localStorage.setItem("theme", "light")
    CurrentUI = "light"
}
UpdateUIcolors(CurrentUI)
var OGname
function SettingsFunctions() {
    OGname = document.querySelector("._HiddenAt_gk0gx_1").textContent
    function Reload() {
        let UserPrefs = JSON.parse(localStorage.getItem("UserPrefs")) || {
            "RemoveCompletedHomework": true,
            "AddUserSelect": true,
            "Timers": true,
            "NameMuffler": "",
        }

        for (Setting in UserPrefs) {
            console.log(Setting, UserPrefs[Setting])
            if (Setting == "NameMuffler") {
                document.querySelector(`#${Setting}`).value = UserPrefs[Setting]
                document.querySelector(`#${Setting}`).addEventListener("input", function() {
                    UserPrefs[this.id] = this.value
                    localStorage.setItem("UserPrefs", JSON.stringify(UserPrefs))
                    if (this.value == "") {
                        document.querySelector("._HiddenAt_gk0gx_1").textContent = OGname
                    }
                    else {
                        document.querySelector("._HiddenAt_gk0gx_1").textContent = this.value
                    }
                })
            }
            else if (UserPrefs[Setting] == true || UserPrefs[Setting] == "true") {
                document.querySelector(`#${Setting}`).checked = true
                document.querySelector(`#${Setting}`).onclick = function() {
                    UserPrefs[this.id] = false
                    localStorage.setItem("UserPrefs", JSON.stringify(UserPrefs))
                    Reload()
                }
            }
            else if (UserPrefs[Setting] == false || UserPrefs[Setting] == "false") {
                document.querySelector(`#${Setting}`).checked = false
                document.querySelector(`#${Setting}`).onclick = function() {
                    UserPrefs[this.id] = true
                    localStorage.setItem("UserPrefs", JSON.stringify(UserPrefs))
                    Reload()
                }
            }
        }

        let CurrentUI = localStorage.getItem("theme") || "light"

        let UIbuttons = document.querySelectorAll("#light, #dusk")
        for (let i = 0; i < UIbuttons.length; i++) {
            let CurrentUIbutton = UIbuttons[i]
            CurrentUIbutton.checked = false
            CurrentUIbutton.onclick = function() {
                localStorage.setItem("theme", this.id)
                UpdateUIcolors(this.id)
                Reload()
            }
        }
        document.getElementById(CurrentUI).checked = true
    }
    Reload()

}

function GetCurrentTime(onlyTime=false) {
    let  currentDate = new Date();

    let  day = currentDate.getDate().toString().padStart(2, '0');
    let  month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let  year = currentDate.getFullYear().toString().slice(-2);
    let  hours = currentDate.getHours().toString().padStart(2, '0');
    let  minutes = currentDate.getMinutes().toString().padStart(2, '0');

    if (onlyTime) {
        return `${hours}:${minutes}`;
    }
    else {
        return `${day}/${month}/${year} (${hours}:${minutes})`;
    }
}

function GetBookworks() {
    let BookworkArrayString = localStorage.getItem("BookworkArray")
    if (BookworkArrayString == null || BookworkArrayString == undefined || BookworkArrayString == "") {
        localStorage.setItem("BookworkArray", [])
        BookworkArrayString = localStorage.getItem("BookworkArray")
    }
    let BookworkArray = JSON.parse(BookworkArrayString)

    for (let i = 0; i < BookworkArray.length; i++) {
        let CurrentChapter = BookworkArray[i]
        AddBookworkElements(CurrentChapter.code, CurrentChapter.question, CurrentChapter.answer, CurrentChapter.timestamp)
    }
}
function SingleQuoteElement(element) {
    return (element.parentElement.innerHTML).replace(new RegExp('"', 'g'), "'")
}
function SingleQuoteText(text) {
    return text.replace(new RegExp('"', 'g'), "'")
}
function AddBookworkElements(code, question, answer, timestamp) {
    Shell = document.querySelector(".block")
    TitleElement = document.querySelector(`[title-id="${code}"]`)

    if (TitleElement == null || TitleElement == undefined) {
        NewTitleElement = document.createElement("div")
        NewTitleElement.classList.add("block-title")
        NewTitleElement.setAttribute("title-id", code)
        NewTitleElement.textContent = code
        Shell.appendChild(NewTitleElement)

        TitleElement = document.querySelector(`[title-id="${code}"]`)
    }

    NewBlockElement = document.createElement("div")
    NewBlockElement.classList.add("block-shell")

    NewBlockQuestionElement = document.createElement("div")
    NewBlockQuestionElement.classList.add("block-inner")
    NewBlockQuestionElement.innerHTML = `<div class="block-inner-title">Question:</div><div class="block-inner-text">${question}</div>`

    NewBlockAnswerElement = document.createElement("div")
    NewBlockAnswerElement.classList.add("block-inner")
    NewBlockAnswerElement.innerHTML = `<div class="block-inner-title">Answer:</div><div class="block-inner-text">${answer}</div>`

    NewBlockTimestampElement = document.createElement("div")
    NewBlockTimestampElement.classList.add("block-inner")
    NewBlockTimestampElement.innerHTML = `<div class="block-inner-title">Timestamp:</div><div class="block-inner-text">${timestamp}</div>`

    try {
        NewBlockElement.appendChild(NewBlockQuestionElement)
        NewBlockElement.appendChild(NewBlockAnswerElement)
        NewBlockElement.appendChild(NewBlockTimestampElement)
        Shell.insertBefore(NewBlockElement, TitleElement.nextSibling)
    }
    catch {
        NewBlockElement.appendChild(NewBlockQuestionElement)
        NewBlockElement.appendChild(NewBlockAnswerElement)
        NewBlockElement.appendChild(NewBlockTimestampElement)
        Shell.appendChild(NewBlockElement)
    }
}

function GetAnswers() {
    // runs after the submit button is pressed
    // checks for different input types, on finding them adds their answer to an array

    let Answers = []

    let Wrapper = document.querySelector("._QuestionWrapper_1ej87_58")

    let Options = Wrapper.querySelectorAll("._OptionSelected_1luff_517") //dont even ask lol :o
    let Cards = Wrapper.querySelectorAll("._CardContent_1luff_653") //dont even ask lol :o
    let Inputs = Wrapper.querySelectorAll("._TextField_1luff_299") //dont even ask lol :o

    if (Options.length > 0) {
        for (let i = 0; i < Options.length; i++) {
            let CurrentOption = Options[i]
            let HTMLtext = CurrentOption.querySelector("div").innerHTML

            Answers.push(SingleQuoteText(HTMLtext))
        }
    }
    if (Cards.length > 0) {
        for (let i = 0; i < Cards.length; i++) {
            let CurrentCard = Cards[i]
            let HTMLtext = CurrentCard.querySelector("div").innerHTML

            Answers.push(SingleQuoteText(HTMLtext))
        }
    }
    if (Inputs.length > 0) {
        for (let i = 0; i < Inputs.length; i++) {
            let CurrentInput = Inputs[i]

            Answers.push(CurrentInput.value)
        }
    }

    return Answers.join(", ")
}
var Question
function BaseButtonClick() {
    console.log("FLAPODOODLE")
    try {
        document.querySelector("._ButtonBase_10evl_1._ButtonContained_10evl_81").onclick = function() {
            if (this.textContent == "Answer") {
                Question = document.querySelector("._TextElement_1luff_67").innerHTML
            }
            if (this.textContent == "Submit answer") {
                let NewBookwork = {
                    "code": document.querySelector("._Chip_bu06u_1").textContent.split(": ")[1],
                    "question": Question,
                    "answer": GetAnswers(),
                    "timestamp": GetCurrentTime()
                }
        
                let BookworkArrayString = localStorage.getItem("BookworkArray")
                if (BookworkArrayString == null || BookworkArrayString == undefined || BookworkArrayString == "") {
                    localStorage.setItem("BookworkArray", [])
                    BookworkArrayString = localStorage.getItem("BookworkArray")
                }
                let BookworkArray = JSON.parse(BookworkArrayString)
        
                BookworkArray.push(NewBookwork)
        
                localStorage.setItem("BookworkArray", JSON.stringify(BookworkArray))
            }
        }
    }
    catch {
        console.log("No Submit Button Found!")
    }
}

function AddPseudoPages() {
    console.log("################################")
    let isMath
    try {
        isMath = true
        document.querySelector("._LQDContainer_1v01e_1").id = "before"
    }
    catch {
        try {
            isMath = false
            document.querySelector("._PageBackground_1qeyl_1").id = "before"
        }
        catch{StartComplete = false}
    }

    if (document.getElementById("bookworks") == undefined || document.getElementById("bookworks") == null) {
        for (page in PageStates) {
            let CurrentPage = PageStates[page]
    
            let NewPage = document.createElement("div")
            NewPage.style.display = "none"
            NewPage.id = page
            NewPage.innerHTML = CurrentPage

            if (isMath) {
                NewPage.classList.add("._LQDContainer_1v01e_1")
                NewPage.style.overflowY = "scroll"
            }
            else {
                NewPage.classList.add("._PageBackground_1qeyl_1")
                NewPage.style.overflowY = "scroll"
            }
    
            document.querySelector("#root").appendChild(NewPage)
        }
    }
}
const StartTime = new Date()
var ClocksDone = false
function GetTimeElapsed() {
    let currentTime = new Date();
    let timeDifference = currentTime - StartTime;

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(timeDifference / 3600000);
    let minutes = Math.floor((timeDifference % 3600000) / 60000);
    let seconds = Math.floor((timeDifference % 60000) / 1000);

    // Format the time
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
}
function AddTimers() {
    if (!ClocksDone) {
        let TimerShell = document.querySelector("._StudentInfoContainer_4fjt9_66")
    
        let Clock = document.createElement("div")
        Clock.classList.add("_XPCount_4fjt9_78")
        Clock.classList.add("clock")
        
        let Stopwatch = document.createElement("div")
        Stopwatch.classList.add("_XPCount_4fjt9_78")
        Stopwatch.classList.add("stopwatch")
    
        TimerShell.appendChild(Clock)
        TimerShell.appendChild(Stopwatch)
    
        function UpdateTimers() {
            let Clock = document.querySelector("._XPCount_4fjt9_78.clock")
            let Stopwatch = document.querySelector("._XPCount_4fjt9_78.stopwatch")
    
            Clock.textContent = GetCurrentTime(true)
            Stopwatch.textContent = GetTimeElapsed()
        }
        UpdateTimers()
        setInterval(UpdateTimers, 1000)
        ClocksDone = true
    }
}
function Gobledegook(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>/?";
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }

    return randomString;
}
function NameMuffler() {
    let UsernameElement = document.querySelector("._HiddenAt_gk0gx_1")
    let NewUsername = JSON.parse(localStorage.getItem("UserPrefs"))["NameMuffler"]
    if (NewUsername == "Random") { NewUsername = Gobledegook(10) }
    UsernameElement.textContent = NewUsername
}

function CSSboiler() {
    let NewStyleText = `
    :root {
        --user-select-accessibility-setting: default !important;
        --spx-shadow-sm: 0px 2px 2px var(--shadow-small) !important;
        --spx-shadow-md: 0px 3px 5px var(--shadow-medium) !important;
        --spx-shadow-lg: 0px 4px 11px -1px var(--shadow-large) !important;
        --palette-dark-blue: var(--raw-darkest) !important;
        --palette-dark-blue-90: var(--raw-dark) !important;
        --palette-light-blue: var(--raw-medium) !important;
        --palette-light-blue-20: var(--raw-lightest) !important;
        --palette-green: var(--raw-light) !important;
        --palette-md-green: var(--raw-medium) !important;
        --palette-md-green-20: var(--raw-lightest) !important;
        --palette-dark-green: var(--raw-darkest) !important;
        --palette-amber: var(--raw-dark) !important;
        --palette-amber-20: var(--raw-light) !important;
        --palette-red: var(--raw-medium) !important;
        --palette-red-20: var(--raw-lightest) !important;
        --palette-purple: var(--raw-medium) !important;
        --palette-purple-20: var(--raw-lightest) !important;
        --palette-dark-purple: var(--raw-dark) !important;
        --palette-blue-grey: var(--raw-lightest) !important;
        --palette-light-grey: var(--raw-shine) !important;
        --palette-dark-blue-90-opacity: var(--raw-dark) !important;
        --palette-green-gradient-start: var(--raw-medium) !important;
        --palette-green-gradient-stop: var(--palette-green) !important;
        --palette-blue-gradient-start: var(--raw-light) !important;
        --palette-blue-gradient-stop: var(--raw-medium) !important;
        --palette-blue-gradient-stop-light: var(--raw-light) !important;
        --palette-orange-gradient-start: var(--raw-medium) !important;
        --palette-orange-gradient-stop: var(--raw-light) !important;
    }
    body {
        overflow-y: hidden;
    }
    *::-webkit-scrollbar {
        width: 10px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: #b8b9c3;
        border-radius: 20px;
        border: 3px solid rgba(255, 255, 255, 0.2);
    }
    *::-webkit-scrollbar-track {
        background: transparent;
    }
    `
    let NewStyle = document.createElement("style")
    NewStyle.innerHTML = NewStyleText

    document.head.appendChild(NewStyle)
}

const init = function() {
    StartComplete = false
}
setTimeout(init, 200)

var StartComplete = false

function StartLoop() {
    let UserPrefs = JSON.parse(localStorage.getItem("UserPrefs")) || {
        "RemoveCompletedHomework": true,
        "AddUserSelect": true,  
        "Timers": true,
        "NameMuffler": "",
    }
    localStorage.setItem("UserPrefs", JSON.stringify(UserPrefs))

    if (!StartComplete) {
        try {
            NewMenuItems = []
            document.querySelector("._FocusTarget_1nxry_1._MenuButton_tgmt4_1").onclick = function() {
                for (let i = 0; i < NewMenuItems.length; i++) {
                    AddMenuItem(NewMenuItems[i][0], NewMenuItems[i][1])
                }
            }
            NewMenuItems.push(["Homework", "homework"])
            NewMenuItems.push(["Back", "before"])
            NewMenuItems.push(["Bookworks", "bookworks"])
            NewMenuItems.push(["Settings", "settings"])
    
            OriginalURL = document.URL
    
            if (UserPrefs["RemoveCompletedHomework"] == true || UserPrefs["RemoveCompletedHomework"] == "true" ) { RemoveCompletedHomework() }
            if (UserPrefs["AddUserSelect"] == true || UserPrefs["AddUserSelect"] == "true" ) { AddUserSelect() }
            if (UserPrefs["Timers"] == true || UserPrefs["Timers"] == "true" ) { AddTimers() }
            if (UserPrefs["NameMuffler"] != "") { NameMuffler() }
            CSSboiler()
            
            StartComplete = true
            document.querySelector("._PageBackgroundImage_1qeyl_21").remove()

        }
        catch (e) {
            console.log(e)
        }
    }
}
setInterval(StartLoop, 100) 
function Loop() {
    BaseButtonClick()
}
setInterval(Loop, 500) 

document.addEventListener('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();

        let canvas = document.querySelector("canvas.canvas");

        if (canvas == undefined || canvas == null) {
            console.log("JIHJLIUHIHBLHBGI")
            // Create a new canvas
            let newCanvas = document.createElement("canvas");
            newCanvas.classList.add("canvas");
            document.body.appendChild(newCanvas);

            newCanvas.style.position = "absolute";
            newCanvas.style.top = "0";
            newCanvas.style.left = "0";
            document.body.style.margin = 0;
            newCanvas.style.backgroundColor = "rgba(240, 248, 255, 0.5)";


            // Get the 2D drawing context
            let ctx = newCanvas.getContext("2d");
            resize();
            // last known position
            var pos = { x: 0, y: 0 };

            window.addEventListener('resize', resize);
            document.addEventListener('mousemove', draw);
            document.addEventListener('mousedown', setPosition);
            document.addEventListener('mouseenter', setPosition);

            // new position from mouse event
            function setPosition(e) {
              pos.x = e.clientX;
              pos.y = e.clientY;
            }

            // resize canvas
            function resize() {
              ctx.canvas.width = window.innerWidth;
              ctx.canvas.height = window.innerHeight;
            }

            function draw(e) {
              // mouse left button must be pressed
              if (e.buttons !== 1) return;
            
              ctx.beginPath(); // begin
            
              ctx.lineWidth = 5;
              ctx.lineCap = 'round';
              ctx.strokeStyle = '#c0392b';
            
              ctx.moveTo(pos.x, pos.y); // from
              setPosition(e);
              ctx.lineTo(pos.x, pos.y); // to
            
              ctx.stroke(); // draw it!
            }
        }
        else {
            canvas.remove()
        }
    }
});
