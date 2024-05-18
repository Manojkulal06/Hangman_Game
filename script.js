document.addEventListener('DOMContentLoaded', function() {
    function showWelcomePage() {
        document.getElementById('front-page').style.display = 'none';
        document.getElementById('category-selection').style.display = 'block';
    }

    document.querySelector('.play-button').addEventListener('click', showWelcomePage);

    document.getElementById('select-category-btn').addEventListener('click', function() {
        var playerName = document.getElementById('player-name').value.trim(); // Get the player's name
        var category = document.getElementById('category').value;

        if (playerName !== '' && category !== '') { // Check if both name and category are selected
            document.getElementById('category-selection').style.display = 'none';
            document.getElementById('hangman-container').style.display = 'block';
            initializeHangman(playerName, parseInt(category)); // Pass playerName and convert category to integer
            setupKeyboard(); // Call the function to set up keyboard event listeners
        } else {
            alert('Please enter your name and select a category.');
        }
    });

    function setupKeyboard() {
        // Get all keyboard buttons
        var keyboardButtons = document.querySelectorAll('.keyboard-btn');

        // Add event listeners to each keyboard button
        keyboardButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var guess = this.dataset.letter.toUpperCase(); // Get the letter from the button's data-letter attribute
                var hangmanInput = document.getElementById('hangman-input');
                hangmanInput.value = guess; // Fill the input field with the guessed letter

                // Trigger the guess button click event
                document.getElementById('hangman-guess-btn').click();
            });
        });
    }  

    document.getElementById('hangman-guess-btn').addEventListener('click', function() {
        if (count > 0) {
            var guess = hangmanInput.value.toUpperCase(); // Convert guessed character to uppercase
            if (guess.length === 1) {
                var isPresent = false;
                for (var i = 0; i < chosenWord.length; i++) {
                    if (guess === chosenWord[i]) {
                        if (disp[i] === '_') {  // Check if the character has already been guessed
                            disp[i] = chosenWord[i];
                            isPresent = true;
                            attempts--;
                            break;  // Break out of the loop once the character is found
                        }
                    }
                }
                if (!isPresent) {
                    count--;
                    if (count > 0) {
                        hangmanAttempts.textContent = "Please guess right character and you left only " + count + " chance";
                    } else {
                        count = 0;
                        hangmanAttempts.textContent = "No chance left";
                    }
                }
                displayWord();
                checkGameStatus();
                if (disp.join('') === chosenWord || count === 0) {
                    hangmanRestartBtn.style.display = 'block'; // Show the restart button
                }
            }
            
            // Start blinking effect on the input field
            hangmanInput.classList.add('blinking');
            // Clear the input field after a brief delay
            setTimeout(function() {
                hangmanInput.value = ''; // Clear the input field
                hangmanInput.classList.remove('blinking'); // Remove blinking effect
                hangmanGuessBtn.disabled = true; // Disable the guess button after it's pressed
            }, 500); // Adjust the delay as needed (in milliseconds)
        }
    });    
    
    
    
    document.getElementById('retry-attempt').addEventListener('click', function() {
        window.location.reload(); // Reload the page
    });
    
    function initializeHangman(playerName, category) {
        var givenWords = [
            ["CProgram", "Java", "DataStructures", "Python", "Html", "CSS", "C++", "JavaScript", "SQL"],
            ["Dog", "Cat", "Cow", "Tiger", "Lion", "Elephant", "Donkey", "Leopard", "Bear", "Rabbit", "Deer"],
            ["Peacock", "Parrot", "Hen", "Pigeon", "Crow", "Duck", "Eagle", "Kingfisher", "Owl", "Sparrow", "Penguin", "Flamingo", "Hummingbird", "Swan", "Hawk"],
            ["Mother", "Father", "Daughter", "Son", "Brother", "Sister", "Aunt", "Friend", "GirlFriend", "Wife", "Husband", "Children", "Grandfather", "Grandmother"],
            ["SachinTendulkar", "RahulDravid", "ViratKohli", "RohitSharma", "MSDhoni", "BrianLara", "RickyPonting", "ShaneWarne", "ShoaibAkhtar", "KapilDev", "AdamGilchrist", "ABdeVilliers", "SteveSmith", "KaneWilliamson", "JoeRoot", "DavidWarner", "ChrisGayle", "BabarAzam", "VivRichards", "RavindraJadeja", "JacquesKallis", "BenStokes", "YuzvendraChahal", "ShikharDhavan", "JaspritBumrah", "YuvrajSingh", "RossTaylor", "JamesFaulkner"]
        ];
    
        var hints = [
            // Hints for programming languages
            ["Its basic programming language", "Not just for morning coffee", "Organized chaos", "Snakey code", "Tag overload", "Partner for HTML", "C's grown-up sibling", "Interactive websites", "Talking to data"],
            // Hints for animals
            ["Chases its tail but never catches it", "Self-appointed ruler of the house", "Moo-ving through life with grace", "Sneaky ninja in the grass", "Wears a majestic fur coat", "Big ears, big trunk, big heart", "The original 'stubborn as a...' creature", "Fashionably spotted feline", "Likes picnics, but not the ants", "Always on the run, never hopping mad"],
            // Hints for birds
            ["Nature's runway model", "Feathered mimic machine", "Egg-cellent clucker", "City's uninvited guest", "Sky's dark gossipmonger", "Quacky aquatic fluffball", "Feathered high-flier boss", "Fish-fancying daredevil", "Night-shift wise guy", "Seed-scoffing tiny tweeter", "Tuxedo-wearing ice slider", "Pink long-necked ballerina", "Nectar-nipping speedster", "Elegant lake princess", "Sharp-eyed sky vigilante"],
            // Hints for family members
            ["Home CEO", "Household Handyman", "Daddy's Little Sunshine", "Mom's Prince Charming", "Sibling Supporter", "Sisterly Sweetheart", "Maternal Mentor", "Buddy for Life", "Heart Stealer", "Better Half", "Partner in Crime", "Chaos Creators", "Family Tree Root", "Family's Comfort Cushion"],
            ["The legend, the greatest, the myth, the one", "not wall he is man", "Aggressive man with no fear", "200 is common", "leader with greatest cricketing brain", "400 also possible", "Gangleader of the greatest gangsters", "Spin wizard", "It's not bomb its a ball", "Man who introduced us to the cricket", "Man who proved wicket keepers can also become a great batsman", "Man who don't fear for any bowlers and play any kind of shots", "Banned and comeback to cricket and  showed the world he is great", "Man who smile at the worst time", "Gardening enthusiast from England", " Most loved australian in india", "Man who shows 100 is common in T20", "Fake king who is overrated", "Man who introduced fear in cricket", "quick fielder, good bowler, good batter", "The greatest allrounder of all time", "A great allrounder forgot bowling", "Man who thinks he is greatest batter but he is good spinner", "The one", "He is unplayable", "The fighter", "The most underrated player from newzealand", "the most underrated allrounder from australia", "first ball 4 is compulsory", "Playing in aggressive mode and legend have just 5 odi century"]
        ];
    
        var hangmanContainer = document.getElementById('hangman-container');
        var hangmanDisplay = document.getElementById('hangman-display');
        var hangmanInput = document.getElementById('hangman-input');
        var hangmanGuessBtn = document.getElementById('hangman-guess-btn');
        var hangmanHints = document.getElementById('hangman-hints');
        var hangmanMessage = document.getElementById('hangman-message');
        var hangmanAttempts = document.getElementById('hangman-attempts');
        var hangmanRestartBtn = document.getElementById('retry-attempt');
        hangmanRestartBtn.style.display = 'none'; // Initially hide the restart button
    
        var chosenCategoryWords = givenWords[category];
        var chosenCategoryHints = hints[category];
        var randomIndex = Math.floor(Math.random() * chosenCategoryWords.length);
        var chosenWord = chosenCategoryWords[randomIndex].toUpperCase(); // Convert to uppercase for consistency
        var hint = chosenCategoryHints[randomIndex];
        var attempts = chosenWord.length;
        var count = 5;
    
        var disp = Array(chosenWord.length).fill('_');
    
        displayWord();
    
        document.getElementById('hangman-guess-btn').addEventListener('click', function() {
            if (count > 0) {
                var guess = hangmanInput.value.toUpperCase(); // Convert guessed character to uppercase
                if (guess.length === 1) {
                    var isPresent = false;
                    for (var i = 0; i < chosenWord.length; i++) {
                        if (guess === chosenWord[i]) {
                            if (disp[i] === '_') {  // Check if the character has already been guessed
                                disp[i] = chosenWord[i];
                                isPresent = true;
                                attempts--;
                                break;  // Break out of the loop once the character is found
                            }
                        }
                    }
                    if (!isPresent) {
                        count--;
                        if (count > 0) {
                            hangmanAttempts.textContent = "Please guess right character and you left only " + count + " chance";
                        } else {
                            count = 0;
                            hangmanAttempts.textContent = "No chance left";
                        }
                    }
                    displayWord();
                    checkGameStatus();
                    if (disp.join('') === chosenWord || count === 0) {
                        hangmanRestartBtn.style.display = 'block'; // Show the restart button
                    }
                }
                hangmanInput.value = ''; // Clear the input field
            }
        });
    
        function displayWord() {
            hangmanDisplay.textContent = disp.join(' ');
            hangmanHints.textContent = "Hint: " + hint;
        }
    
        function checkGameStatus() {
            if (disp.join('') === chosenWord) {
                hangmanMessage.textContent = "You guessed the word! Congratulations!";
                hangmanGuessBtn.disabled = true; // Disable the guess button
            } else if (attempts === 0 && count === 5) {
                hangmanMessage.textContent = "Congrats you guessed right and your knowledge is impressive keep it up :)";
            } else if (count < 5 && attempts === 0) {
                hangmanMessage.textContent = "Congrats you guessed it right and  keep it up :)";
            } else if (attempts > 0 && count === 0) {
                hangmanMessage.textContent = "Ohhh "+playerName+" you tried well but lost :( correct answer is " + chosenWord;
            } else if (count === 0) {
                hangmanMessage.textContent = "Sorry "+playerName+" you lost game :( correct answer is " + chosenWord;
            } else if (attempts === 0) {
                hangmanMessage.textContent = playerName+" You guessed the word! Congratulations!";
            }
        }
    
    }
});
