import {classNames} from "./classNames";

describe('classNames', ()=>{
    test('test', ()=>{

        expect(classNames('someClass',{hovered:true},['class1', 'class2'])).toBe("someClass class1 class2 hovered")
    })
})