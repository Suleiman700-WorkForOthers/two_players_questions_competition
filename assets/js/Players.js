
const players_data = [
    {
        id: 1,
        name: '',
        score: 0
    },
    {
        id: 2,
        name: '',
        score: 0
    }
]

const p1_controls = [
    {
        key: 81, // Q
        target_answer: 1
    },
    {
        key: 87, // W
        target_answer: 2
    },
    {
        key: 65, // A
        target_answer: 3
    },
    {
        key: 83, // S
        target_answer: 4
    },
]

const p2_controls = [
    {
        key: 38, // Arrow Up
        target_answer: 1
    },
    {
        key: 40, // Arrow Down
        target_answer: 2
    },
    {
        key: 37, // Arrow Left
        target_answer: 3
    },
    {
        key: 39, // Arrow Right
        target_answer: 4
    },
]

// Get player data by his id
function get_player_data(_player_id) {
    return players_data.find(player_data => {
        return player_data['id'] === _player_id
    })
}

// Set player data by his id (key: value)
function set_player_data(_player_id, _key, _value) {
    players_data.map(player_data => {
        if (player_data['id'] === _player_id) {
            player_data[_key] = _value
        }
    })
}

function increase_player_score(_player_id) {
    players_data.map(player_data => {
        if (player_data['id'] === _player_id) {
            player_data['score'] += 1
        }
    })
}
