# TODO list Docly

- [x] Update render() in canvas, DONE
- [x] Update bounds in canvas.render() DONE
- [x] Get rendering working, DONE
- [x] BreakIntoLines bounds.width not working OR computation of size not working DONE
- [x] Where to we apply style and options? with canvas, send it
- [x] update bounds in canvas.render() for pagination. also Bounds width? DONE
- [x] BUG: When changing size to 10, lineheight changes. But it still calculates is as 30 wide. DONE
- [x] We need to dynamically insert options. we can find option on render() but need things for calculations earlier, already in context, but each render needs to be able to look at options. DONE, takes style from context, as long as we change context in Canvas, it should be fine.

- [ ] Do we need some kind of operations Center? DOCUMENT! It will hold all the layout, (Also need to override Bounds if needed. Was Thinking of putting that in each content, but I think it wil lbe better for Document to handle that.)
- [ ] How do we determine if its a paragraph or inline? and the style of it, in style?
- [ ] We also need to check centralized etc
- [x] NEed to implement definition list
- [ ] Store different style in canvas?
- [ ] add pdf (receipts)
- [ ] add img

# Notes

## General flow

> Data comes into Document
>
> > Document looks at it, determines type
> >
> > > Types creates Operations, sends for rendering

What do we use Element Bounds for?
Do we use element Bounds? We have them implemented in BLock and inline Content, but not completely sure. Should we use Indention? Still not sure how layouting should work.

### Elements

What does a paragraph need?
_ Bounds (Internal)
_ Style
_ Content
_ Block elements, has margins around and takes full width (Bound width.)

- Need some kind of solution to styling. Changing context is not working at the moment. Need to debug there.

### Daily notes

Fix font and font size for bold

