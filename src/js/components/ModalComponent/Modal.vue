<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="box">
                <div v-show="!editMode">
                    <p>Name: {{person.firstName}} {{person.lastName}}</p>
                    <p>DOB: {{terseDate(person.DOB)}}</p>
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
                            <input class="input" type="date" v-model="proxy" @keyup="update.DOB = proxy" required>
                        </p>

                        <label class="label">Zip Code</label>
                        <p class="control">
                            <input class="input" type="text" placeholder="zip code" v-model="update.zipCode" required>
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
    import _ from 'lodash';

    export default {
        props: [
            'person'
        ],
        data() {
            return {
                editMode: false,
                update: {},
                proxy: ''
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
                this.proxy = this.terseDate(this.update.DOB);
            },
            updatePerson() {
                const debouncedNotify = _.debounce(() => {
                    Event.$emit('notify', 'You haven\'t made any changes')
                }, 2000, { trailing: true });

                if (_.isEqual(this.person, this.update)) {
                    return debouncedNotify();
                }

                this.editMode = false;
                this.close();
                Event.$emit('update', this.update);
            },
            terseDate(date) {
                if (date) return date.slice(0, date.indexOf('T'));
            }
        }
    }
</script>

