<template>
    <form name="addPersonForm" @submit.prevent="submitNewPerson(form)">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Add Person
                </p>
                <a class="card-header-icon">
                      <span class="icon">
                        <i class="fa fa-angle-down"></i>
                      </span>
                </a>
            </header>
            <div class="card-content" :class="{'collapse': isCollapsed}">
                <div class="content">
                    <span class="help is-danger" v-if="warning">{{warning}}</span>
                    <label class="label">First Name</label>
                    <p class="control">
                        <input class="input" type="text" placeholder="first name" v-model="form.firstName" required>
                    </p>

                    <label class="label">Last Name</label>
                    <p class="control">
                        <input class="input" type="text" placeholder="last name" v-model="form.lastName"
                               required>
                    </p>

                    <label class="label">Birthdate</label>
                    <p class="control">
                        <input class="input" type="date" v-model="form.DOB" required>
                    </p>

                    <label class="label">Zip Code</label>
                    <p class="control">
                        <input class="input" type="string" placeholder="zip code" v-model="form.zipCode"
                               required>
                    </p>
                </div>
            </div>
            <footer class="card-footer">
                <button type="submit" class="card-footer-item button"
                        :class="{'is-loading': isLoading}">Submit
                </button>
                <a class="card-footer-item" @click="resetForm">Reset</a>
                <a class="card-footer-item" @click="collapse">{{buttonState}}</a>
            </footer>
        </div>
    </form>
</template>

<script>
    import FormClass from '../../core/Form';

    export default {
        data() {
            return {
                isLoading: false,
                form: new FormClass({
                    firstName: '',
                    lastName: '',
                    DOB: '',
                    zipCode: ''
                }),
                warning: '',
                isCollapsed: false,
                buttonState: 'Collapse'
            }
        },
        methods: {
            submitNewPerson(form) {
                this.isLoading = true;

                this.form.post('/api/person', form)
                    .then(response => {
                        if (response.err) {
                            this.warning = 'all fields must be filled out';
                        } else {
                            return response;
                        }
                    })
                    .then(person => {
                        if (person) {
                            this.resetForm();
                            setTimeout(() => {
                                this.isLoading = false;
                                Event.$emit('addToList', person)
                                Event.$emit('notify', `${person.firstName} ${person.lastName} has been added to the list`);
                            }, 1000);
                        }
                    })
                    .catch(err => {
                        throw new Error(err.statusText);
                    });
            },
            resetForm() {
                this.form.reset();
            },
            collapse() {
                this.isCollapsed = !this.isCollapsed;
                this.buttonState = this.isCollapsed ? 'Expand' : 'Collapse';
                console.log(this.buttonState);
            }
        }
    }

</script>

<style>

    form[name="addPersonForm"] {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .1);
    }

    button.card-footer-item {
        height: 100%;
        border-radius: 0;
        border: none;
        color: #00d1b2;
    }

    .card-content {
        height: 335px;
        transition: height 1.25s, padding .75s;
    }

    .collapse {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        overflow: scroll;
    }

    .card-content .content {
        height: 282px;
        transition: height 1.05s;
        overflow: hidden;
    }

    .collapse .content {
        height: 0;
    }
</style>

