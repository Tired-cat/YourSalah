//is working
let city=[
    'Dubai',
    'Abu Dhabi',
     'Al Ain',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Oman',
    'London',
    'Dar es Salaam',
    'Mumbai',
    'Riyath',
    'Tokyo',
    'Zanzibar '
    ]
    
    var InputBox = document.querySelector("#Seacrh-me")
    var UserIn = $("#Seacrh-me")
    var UserOu = $(".result-box")
    
    UserIn.on("keyup", function() {  
        UserOu.html(""); // Clear suggestions on every keyup event
        var userInput = UserIn.val(); 
        if (userInput.length > 0){ 
            var filteredCities = city.filter(function(keyword){
                return keyword.toLowerCase().includes(userInput.toLowerCase());
            });
            console.log(filteredCities);
            display(filteredCities);
        }
    });
    
       debugger;
        function display(filteredCities){
        
            var suggestions= filteredCities.map((list)=> {
                  return "<li onclick=selectInput(this)>"+list+"</li>"
            }
            )
                
    
                  UserOu.html("<ul>"+ suggestions.join("") +"</ul>")
    
               
        }
    
       
        function selectInput(text) {
            InputBox.value= text.innerHTML
            UserOu.html('')
        }
       
    