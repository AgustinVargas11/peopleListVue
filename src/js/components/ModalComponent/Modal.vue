<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="box">
                <div v-show="!editMode">
                    <p>Name: {{person.firstName}} {{person.lastName}}</p>
                    <p>DOB: {{humanReadableDate(person.DOB)}}</p>
                    <p>Zip code: {{person.zipCode}}</p>
                </div>
                <div v-show="editMode">
                    <form @submit.prevent="updatePerson">
                        <label class="label">First Name</label>
                        <p class="control">
                            <input class="input" type="text" placeholder="first name" v-model="update.firstName"
                                   required>
                        </p>

                        <label class="label">Last Name</label>
                        <p class="control">
                            <input class="input" type="text" placeholder="last name" v-model="update.lastName"
                                   required>
                        </p>

                        <label class="label">Birthdate</label>
                        <p class="control">
                            <input class="input" type="date" v-model="update.DOB" required>
                        </p>

                        <label class="label">Zip Code</label>
                        <p class="control">
                            <input class="input" type="string" placeholder="zip code" v-model="update.zipCode" required>
                        </p>
                        <button class="button is-success" type="submit">Done</button>
                        <button class="button is-warning" type="button" @click="editMode = false">Cancel</button>
                    </form>
                </div>
            </div>
            <button class="button is-danger" @click="deletePerson" title="delete name" v-show="!editMode">Delete this
                person
            </button>
            <button class="button is-info" @click="editPerson" title="delete name" v-show="!editMode">Edit this person
            </button>
        </div>
        <button class="modal-close" @click="close"></button>
    </div>
</template>

<script>
    export default {
        props: [
            'person'
        ],
        data() {
            return {
                editMode: false,
                update: {}
            }
        },
        methods: {
            close() {
                Event.$emit('close');
            },
            deletePerson() {
                this.close();
                Event.$emit('deleteThisPerson');
            },
            editPerson() {
                this.editMode = true;
                this.update = Object.assign({}, this.person);
                this.update.DOB = this.person.DOB.slice(0, this.person.DOB.indexOf('T'));
            },
            updatePerson() {
                this.editMode = false;
                this.close();
                Event.$emit('update', this.update);
            },
            humanReadableDate(date) {
                return new Date(date).toLocaleDateString();
            }
        }
    }
</script>
