<template>

    <nav class="panel">
        <p class="panel-heading">
            People
        </p>
        <div class="panel-block">
            <p class="control has-icon">
                <input class="input is-small" type="text" placeholder="Search">
                <span class="icon is-small">
        <i class="fa fa-search"></i>
      </span>
            </p>
        </div>
        <div class="panel-content">
            <a v-for="(person, index) in people" class="panel-block" @click="selectPerson(person, index)">
                <p>{{person.firstName}} {{person.lastName}}</p>
            </a>
        </div>
        <div class="panel-block">

        </div>
    </nav>

</template>

<script>

    export default {
        data() {
            return {
                people: []
            }
        },
        mounted() {
            fetch('/api/person')
                .then(response => response.json())
                .then(response => {
                    this.people = response;
                })
                .catch(err => {
                    throw new Error(err.statusText);
                })
        },
        created() {
            Event.$on('addToList', this.addToList);
            Event.$on('deletePerson', this.deletePerson);
            Event.$on('update', this.updatePerson);
        },
        methods: {
            addToList(person) {
                this.people.push(person);
            },
            updatePerson(updatedPerson) {
                fetch(`/api/person/${updatedPerson._id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'put',
                    body: JSON.stringify(updatedPerson)
                })
                    .then(response => response.json())
                    .then(response => {
                        let index = updatedPerson.index;
                        this.people.splice(index, 1, response);
                        Event.$emit('notify', 'Successfully updated!');
                    })
                    .catch(err => console.log(err));
            },
            selectPerson(person, index) {
                Event.$emit('selectedPerson', { person, index });
            },
            deletePerson(person) {
                fetch(`/api/person/${person._id}`, {
                    method: 'delete'
                })
                    .then(response => {
                        this.people.splice(person.index, 1);
                        console.log(person);
                        Event.$emit('notify', `${person.firstName} ${person.lastName} has been deleted`);
                    })
                    .catch(err => console.log(err));
            }
        }
    }

</script>

<style>

    .panel {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .1);
    }

    .column {
        display: inline-block;
    }

    .name {
        transition: background-color .5s;
        text-align: center;
        background-color: #fff;
        border: darkcyan 1px solid;
    }

    .name:hover {
        background-color: #ccc;
    }

    .panel-content {
        height: auto;
        max-height: 325px;
        overflow: scroll;
    }

    .panel-block p {
        margin: auto;
    }
</style>