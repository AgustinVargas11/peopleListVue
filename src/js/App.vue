<template>
    <div id="root">
        <div class="columns">
            <div class="column is-4-desktop is-5-tablet is-12-mobile">
                <new-person-form></new-person-form>
            </div>
            <div class="column is-3-desktop is-3-tablet is-12-mobile">
                <list></list>
            </div>
        </div>
        <modal v-show="showModal" :person="$data.selectedPerson"></modal>
        <Notification v-show="notify">
            {{notification}}
        </Notification>
    </div>
</template>

<script>
    import NewPersonForm from './components/FormComponent/Form.vue';
    import List from './components/ListComponent/List.vue';
    import Modal from './components/ModalComponent/Modal.vue';
    import Notification from './components/NotificationComponent/Notification.vue';

    export default {
        name: 'root',
        components: {
            NewPersonForm,
            List,
            Modal,
            Notification
        },
        created() {
            Event.$on('selectedPerson', ({ person, index }) => {
                this.selectedPerson = person;
                this.selectedPerson.index = index;
                this.showModal = true;
            });

            Event.$on('close', () => {
                this.showModal = false;
            });

            Event.$on('deleteThisPerson', () => {
                Event.$emit('deletePerson', this.selectedPerson);
            });

            Event.$on('notify', (message) => {
                this.notification = message;
                this.notify = true;
                setTimeout(() => {
                    this.notify = false;
                }, 3000)
            });
        },
        data() {
            return {
                showModal: false,
                selectedPerson: {},
                notify: false,
                notification: ''
            }
        }
    }
</script>

<style>
    body {
        padding: 1em;
    }
</style>