'use strict';

let Router = require('express').Router;
let Person = require('../models/personSchema');

const router = Router();


class ErrorMessage {
    constructor(message, err) {
        this.message = message;
        this.err = err;
    }
}

router.route('/')
    .get((req, res) => {
        Person.find(req.query, (err, people) => {
            if (err) return res.status(500).send(err);
            res.send(people);
        })
    })
    .post((req, res) => {
        let newPerson = new Person(req.body);

        newPerson.save((err, newPerson) => {
            if (err) return res.status(500).send(
                new ErrorMessage('user not saved', err)
            );
            res.send(newPerson);
        });

    });

router.route('/:id')
    .get((req, res) => {
e
        let { id } = req.params;

        Person.findById(id, (err, person) => {
            if (err) return res.status(500).send(err);
            res.send(person);
        })
    })
    .put((req, res) => {
        let { id } = req.params;
        let updatedPerson = req.body;

        Person.findByIdAndUpdate(id, updatedPerson, { new: true }, (err, modifiedPerson) => {
            if (err) if (err) return res.status(500).send(err);
            res.send(modifiedPerson);
        });
    })
    .delete((req, res) => {
        let { id } = req.params;

        Person.findByIdAndRemove(id, (err, deletedPerson) => {
            if (err) return res.status(500).send(
                new ErrorMessage('Person was not deleted', err)
            );
            res.send(deletedPerson);
        })
    });

module.exports = router;