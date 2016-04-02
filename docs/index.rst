reStructureText experiment!
===========================

A paragraph containing only two colons 
indicates that the following indented 
or quoted text is a literal block. 

:: 

  Whitespace, newlines, blank lines, and 
  all kinds of markup (like *this* or 
  \this) is preserved by literal blocks. 

  The paragraph containing only '::' 
  will be omitted from the result. 

The ``::`` may be tacked onto the very 
end of any paragraph. The ``::`` will be 
omitted if it is preceded by whitespace. 
The ``::`` will be converted to a single 
colon if preceded by text, like this:: 

  It's very convenient to use this form. 

Literal blocks end when text returns to 
the preceding paragraph's indentation. 
This means that something like this 
is possible:: 

      We start here 
    and continue here 
  and end here. 

Per-line quoting can also be used on 
unindented literal blocks:: 

> Useful for quotes from email and 
> for Haskell literate programming.

-a            command-line option "a" 
-b file       options can have arguments 
              and long descriptions 
--long        options can be long also 
--input=file  long options can also have 
              arguments 
/V            DOS/VMS-style options too

:Authors: 
    Tony J. (Tibs) Ibbs, 
    David Goodger

    (and sundry other good-natured folks)

:Version: 1.0 of 2001/08/08 
:Dedication: To my father.

Enumerated lists:

3. This is the first item 
4. This is the second item 
5. Enumerators are arabic numbers, 
   single letters, or roman numerals 
6. List items should be sequentially 
   numbered, but need not start at 1 
   (although not all formatters will 
   honour the first index). 
#. This item is auto-enumerated

Bullet lists:

- This is item 1 
- This is item 2

- Bullets are "-", "*" or "+". 
  Continuing text must be aligned 
  after the bullet and whitespace.

Note that a blank line is required 
before the first item and after the 
last, but is optional between items.

===== 
Title 
===== 

Subtitle 
--------

Titles are underlined (or over- 
and underlined) with a printing 
nonalphanumeric 7-bit ASCII 
character. Recommended choices 
are "``= - ` : ' " ~ ^ _ * + # < >``". 
The underline/overline must be at 
least as long as the title text. 

A lone top-level (sub)section 
is lifted up to be the document's 
(sub)title.

\*escape* \``with`` "\\"		

*escape* ``with`` "\"	

http://docutils.sf.net/	

|substitution reference|	
``inline literal``	
`interpreted text`	
