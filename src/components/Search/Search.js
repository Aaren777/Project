import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';
import { InputGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { textTruncate } from '../../helpers/utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const statusOptions = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];
const sortOptions = [
    {
        label: 'Sort',
        value: ''
    },
    {
        label: ' A-Z ',
        value: 'a-z'
    },
    {
        label: ' Z-A ',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    }
];
const dateOptions = [
    {
        label: 'Created before',
        value: 'create_lte'
    },
    {
        label: 'Created after',
        value: 'create_gte'
    },
    {
        label: 'Completed before',
        value: 'complete_lte'
    },
    {
        label: 'Completed after',
        value: 'complete_gte'
    }
];
function Search({getTasks}) {
    const [status, setStatus] = useState({
        value: ''
    });
    const [sort, setSort] = useState({
        value: ''
    });
    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null,
    });
    const handeleChangeDate = (value, name) => {
        setDates({
            ...dates,
            [name]: value
        })
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
           return handleSubmit()
        }
    };
    const handleSubmit = () => {
        const params = {};

        search && (params.search = search);
        status.value && (params.status = status.value);
        sort.value && (params.sort = sort.value);

        for (let i in dates) {
            const value = dates[i];
            if (value) {
                const date = value.toLocaleDateString();
                params[i] = date;
            }
        }
        getTasks(params)
    }


    const [search, setSearch] = useState('');

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search..."
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyPress={handleKeyDown}
                />
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-primary"
                    title={status.value ? status.label : 'Status'}
                    id="input-group-dropdown-2"
                >
                    {
                        statusOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={status.value === option.value}
                                onClick={() => setStatus(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-primary"
                    title={sort.value ? textTruncate(sort.label, 4) : 'Sort'}
                    id="input-group-dropdown-2"
                >
                    {
                        sortOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={sort.value === option.value}
                                onClick={() => setSort(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-primary"
                    title= 'Dates'
                    id="input-group-dropdown-2"
                >
                {
                    dateOptions.map((option, index) => (
                        <div
                            key={index}
                        >
                            {option.label}
                            <DatePicker
                                selected={dates[option.value]}
                                onChange={(value) => handeleChangeDate(value, option.value)}
                            />
                        </div>
                    ))
                }
                </DropdownButton>
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            
        </div>
    )
}
const mapDispatchToProps = {
    getTasks
}
export default connect(null, mapDispatchToProps)(Search)