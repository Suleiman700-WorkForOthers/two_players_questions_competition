
let game_started = false
let game_over = false

function actually_start_game() {
    set_player_text_names()
    const current_question_id = questions_data['current_question_id']
    load_next_question(current_question_id)
}

function end_game() {
    // Find which player has the bigger score
    const p1 = get_player_data(1)
    const p2 = get_player_data(2)

    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    if (p1['score'] > p2['score']) {
        document.getElementById('modal_text').innerText = `The winner of round one is: ${p1['name']}`
    }
    else if (p1['score'] < p2['score']) {
        document.getElementById('modal_text').innerText = `The winner of round one is: ${p2['name']}`
    }
    else {
        document.getElementById('modal_text').innerText = `There is no winner, Its a draw!`
    }

}

// Set the question text
function set_question_text(_question_data) {
    const question_text = document.getElementById('question_text')
    question_text.innerHTML = _question_data['text']
}

// Set the four question answers
function set_question_answers(_question_data) {
    const q1_text = document.getElementById('q1_text')
    const q2_text = document.getElementById('q2_text')
    const q3_text = document.getElementById('q3_text')
    const q4_text = document.getElementById('q4_text')

    q1_text.innerHTML = _question_data['answers'][0]
    q2_text.innerHTML = _question_data['answers'][1]
    q3_text.innerHTML = _question_data['answers'][2]
    q4_text.innerHTML = _question_data['answers'][3]
}

// Set player text names
function set_player_text_names() {
    document.getElementById('p1_name').innerText = get_player_data(1)['name']
    document.getElementById('p2_name').innerText = get_player_data(2)['name']
}

// Check which player has pressed the key
function check_which_player_pressed(_keyCode) {
    // Check player one keys
    const p1_pressed = p1_controls.find(control => {
        return control['key'] === _keyCode
    })

    if (p1_pressed !== undefined) {
        return {
            player: 1,
            target_answer: p1_pressed['target_answer']
        }
    }

    const p2_pressed = p2_controls.find(control => {
        return control['key'] === _keyCode
    })

    if (p2_pressed !== undefined) {
        return {
            player: 2,
            target_answer: p2_pressed['target_answer']
        }
    }
}

// Check if player has pressed the correct answer button
function check_if_correct_answer(_player_id, _chosen_answer_id) {
    const question_id = questions_data['current_question_id']

    // Get question correct answer
    const correct_question_answer = questions[question_id]['correct_answer']

    // Check if player chose the correct answer
    if (correct_question_answer === _chosen_answer_id) {
        increase_player_score(_player_id)
        update_player_score_text(_player_id)
        show_round_winner(_player_id)
        questions_data['current_question_id'] = question_id+1

        // Check if there are more questions
        if (question_id+1 === questions.length) {
            // Reached the end of questions > Move to part two of the game
            // end_game()
            game_over = true
        }
        else {
            // There are still questions > Show next question
            load_next_question(question_id+1)
        }
    }
    else {
        console.log('bad')
    }
}

// On keyword key down event
document.addEventListener("keydown", function(event) {
    // event.preventDefault()

    // Get pressed key
    const pressed_key = event.keyCode

    // Check which player has pressed
    const player_pressed = check_which_player_pressed(pressed_key)

    // If key has not been pressed by a player controls
    if (!player_pressed) return

    check_if_correct_answer(player_pressed['player'], player_pressed['target_answer'])
})


// Update player score text
function update_player_score_text(_player_id) {
    if (_player_id === 1) {
        const score = document.getElementById('p1_score')
        const player_score = get_player_data(_player_id)['score']
        score.innerText = player_score
    }
    else if (_player_id === 2) {
        const score = document.getElementById('p2_score')
        const player_score = get_player_data(_player_id)['score']
        score.innerText = player_score
    }
}

// Show UI about the round winner
function show_round_winner(_player_id) {
    const player_name = get_player_data(_player_id)['name']
    // alert(`The winner of this round is: ${player_name}`)

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementById('modal_text').innerText = `The winner of this question is: ${player_name}`
}

function load_next_question(_current_question_id) {
    const data = get_question_data(_current_question_id)
    set_question_text(data)
    set_question_answers(data)
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";

    if (game_over) {
        end_game()
    }
}
