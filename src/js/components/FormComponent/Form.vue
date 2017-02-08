<template>
    <form name="addPersonForm" @submit.prevent="submitNewPerson(form); $v.form.$reset()">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Add Person
                </p>
            </header>
            <div class="card-content" :class="{'collapse': isCollapsed}">
                <div class="content">
                    <label class="label">First Name</label>

                    <p class="control" :class="{'m-b-0': $v.form.firstName.$error}">
                        <input class="input" :class="{'is-danger': $v.form.firstName.$error}" type="text"
                               placeholder="first name" v-model.trim="form.firstName"
                               @input="$v.form.firstName.$touch()" required>
                        <span class="help is-danger" v-if="!$v.form.firstName.required && $v.form.firstName.$dirty">First name is required</span>
                        <span class="help is-danger" v-if="!$v.form.firstName.minLength">First name must be longer than 2 letters</span>
                    </p>

                    <label class="label" :class="{'m-b-0': $v.form.lastName.$error}">Last Name</label>
                    <p class="control">
                        <input class="input" :class="{'is-danger': $v.form.lastName.$error}" type="text"
                               placeholder="last name" v-model.trim="form.lastName" @input="$v.form.lastName.$touch()"
                               required>
                        <span class="help is-danger" v-if="!$v.form.lastName.required && $v.form.lastName.$dirty">Last name is required</span>
                        <span class="help is-danger" v-if="!$v.form.lastName.minLength">Last name must be longer than 2 letters</span>
                    </p>

                    <label class="label">Date of Birth</label>
                    <p class="control" :class="{'m-b-0': $v.form.DOB.$error}">
                        <input class="input" :class="{'is-danger': $v.form.DOB.$error}" type="date"
                               min="1910-12-31" max="2012-12-31" v-model.trim="form.DOB" @blur="$v.form.DOB.$touch()"
                               required>
                        <span class="help is-danger" v-if="!$v.form.DOB.required && $v.form.DOB.$dirty">Date of birth is required</span>
                    </p>

                    <label class="label" :class="{'m-b-0': $v.form.zipCode.$error}">Zip Code</label>
                    <p class="control">
                        <input class="input" :class="{'is-danger': $v.form.zipCode.$error}" type="text"
                               placeholder="zip code" maxlength="5"
                               v-model.trim="form.zipCode" @input="$v.form.zipCode.$touch()" required>
                        <span class="help is-danger" v-if="!$v.form.zipCode.required && $v.form.zipCode.$dirty">Zip code is required</span>
                        <span class="help is-danger"
                              v-if="!$v.form.zipCode.minLength">Zip code must be 5 numbers long</span>
                        <span class="help is-danger"
                              v-if="!$v.form.zipCode.maxLength">Zip code must be 5 numbers long</span>
                        <span class="help is-danger" v-if="!$v.form.zipCode.isNum">Zip code must not contain alphabetic characters</span>
                    </p>
                </div>
            </div>
            <footer class="card-footer">
                <button type="submit" class="card-footer-item button" :class="{'is-loading': isLoading}"
                        :disabled="$v.form.$error">Submit
                </button>
                <a class="card-footer-item" @click="handleClick($v.form.$reset)">Reset</a>
                <a class="card-footer-item" @click="collapse">{{buttonState}}</a>
            </footer>
        </div>
    </form>
</template>

<script>
    import FormClass from '../../core/Form';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import isNum from '../../core/customValidators/isNum';

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
        validations: {
            form: {
                firstName: {
                    required,
                    minLength: minLength(2)
                },
                lastName: {
                    required,
                    minLength: minLength(2)
                },
                DOB: {
                    required
                },
                zipCode: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(5),
                    isNum
                }
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
                            this.form.reset();
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
            collapse() {
                this.isCollapsed = !this.isCollapsed;
                this.buttonState = this.isCollapsed ? 'Expand' : 'Collapse';
            },
            handleClick(fn) {
                this.form.reset();
                fn();
            }
        }
    }

</script>

<style>

    form[name="addPersonForm"] {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .1);
        line-height: 1.2;
    }

    button.card-footer-item {
        height: 100%;
        border-radius: 0;
        border: none;
        color: #00d1b2;
    }

    .card-content {
        height: 330px;
        /*max-height: 363px;*/
        transition: height 1.25s, padding .75s;
        overflow: hidden;
    }

    .collapse {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

    .card-content .content {
        height: auto;
        min-height: 282px;
        transition: height 1.05s;
        overflow: hidden;
    }

    .collapse .content {
        height: 0;
    }

    .m-b-0 {
        margin-bottom: 0 !important;
    }


</style>

