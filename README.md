# buongiorni
just a quick test for a more "natural" way to change the values of objects in array-structures.

## todo
if this project should go anywhere some todos:
- how can values be parsed? currently everything is treated as a string
- how are nested values processed?
- which rules make sense? keeping it simple VS many functions


## demo

### how to use

```javascript
const newData = buongiorni(ruleset, data); // newData containts edited data
```

### input data
```javascript
const data = [
  {
    name: "Tricia Torres",
    gender: "female",
    email: "triciatorres@protodyne.com",
  },
  {
    name: "Elba Bowen",
    gender: "female",
    email: "elbabowen@protodyne.com",
  },
  {
    name: "Mckenzie Bryan",
    gender: "male",
    email: "mckenziebryan@protodyne.com",
  },
  {
    name: "Violet Boyer",
    gender: "female",
    email: "violetboyer@protodyne.com",
  },
  {
    name: "Jeannie Holland",
    gender: "female",
    email: "jeannieholland@protodyne.com",
  },
  {
    name: "Aisha Lynch",
    gender: "female",
    email: "aishalynch@protodyne.com",
  },
]
```
### ruleset

tabs are just for visibility. the end of an action is  determined by the "end" command (could be done more elegantly tbh).

```javascript
const ruleset = `
every 2
    age 20
    cool TRUE
    end
from 5
    late TRUE
    end
from 2 to 4
    middle TRUE
    end
`;


// idea: age * 3
```

### output
```javascript
[ { name: 'Tricia Torres',
    gender: 'female',
    email: 'triciatorres@protodyne.com' },
  { name: 'Elba Bowen',
    gender: 'female',
    email: 'elbabowen@protodyne.com',
    age: '20',
    cool: 'TRUE' },
  { name: 'Mckenzie Bryan',
    gender: 'male',
    email: 'mckenziebryan@protodyne.com',
    middle: 'TRUE' },
  { name: 'Violet Boyer',
    gender: 'female',
    email: 'violetboyer@protodyne.com',
    age: '20',
    cool: 'TRUE',
    middle: 'TRUE' },
  { name: 'Jeannie Holland',
    gender: 'female',
    email: 'jeannieholland@protodyne.com',
    middle: 'TRUE' },
  { name: 'Aisha Lynch',
    gender: 'female',
    email: 'aishalynch@protodyne.com',
    age: '20',
    cool: 'TRUE',
    late: 'TRUE' } ]
```
