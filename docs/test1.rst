reStructureText experiment!
===========================

An "empty comment" does not 
consume following blocks. 
(An empty comment is ".." with 
blank lines before and after.)

..

        So this block is not "lost", 
        despite its indentation.

.. This text will not be shown 
   (but, for instance, in HTML might be 
   rendered as an HTML comment)

The |biohazard| symbol must be used on containers used to dispose of medical waste.

.. |biohazard| image:: biohazard.png

For instance:

.. image:: images/ball1.gif

Titles are targets, too 
======================= 
Implict references, like `Titles are 
targets, too`_.

Python_ is `my favourite 
programming language`__.

.. _Python: http://www.python.org/

__ Python_

Internal crossreferences, like example_.

This is an example crossreference target.

External hyperlinks, like `Python 
<http://www.python.org/>`_.

External hyperlinks, like Python_.

.. _Python: http://www.python.org/

Citation references, like [CIT2002]_. 
Note that citations may get 
rearranged, e.g., to the bottom of 
the "page".

.. [CIT2002] A citation 
   (as often used in journals).

Citation labels contain alphanumerics, 
underlines, hyphens and fullstops. 
Case is not significant.

Given a citation like [this]_, one 
can also refer to it like this_.

.. [this] here.

.. _example:

Auto-symbol footnotes are also 
possible, like this: [*]_ and [*]_ and [*]_.

.. [*] This is the first one. 
.. [*] This is the second one.
.. [*] What about this?



Autonumbered footnotes are 
possible, like using [#]_ and [#]_.

.. [#] This is the first one. 
.. [#] This is the second one.

They may be assigned 'autonumber 
labels' - for instance, 
[#fourth]_ and [#third]_.

.. [#third] a.k.a. third_

.. [#fourth] a.k.a. fourth_

Footnote references, like [4]_. 
Note that footnotes may get 
rearranged, e.g., to the bottom of 
the "page".

.. [4] A numerical footnote. Note 
   there's no colon after the ``]``.

A transition marker is a horizontal line 
of 4 or more repeated punctuation 
characters.

------------

A transition should not begin or end a 
section or document, nor should two 
transitions be immediately adjacent.

Simple table:

=====  =====  ====== 
   Inputs     Output 
------------  ------ 
  A      B    A or B 
=====  =====  ====== 
False  False  False 
True   False  True 
False  True   True 
True   True   True 
=====  =====  ======

Grid table:

+------------+------------+-----------+ 
| Header 1   | Header 2   | Header 3  | 
+============+============+===========+ 
| body row 1 | column 2   | column 3  | 
+------------+------------+-----------+ 
| body row 2 | Cells may span columns.| 
+------------+------------+-----------+ 
| body row 3 | Cells may  | - Cells   | 
+------------+ span rows. | - contain | 
| body row 4 |            | - blocks. | 
+------------+------------+-----------+

Doctest blocks are interactive 
Python sessions. They begin with 
"``>>>``" and end with a blank line.

>>> print "This is a doctest block." 
This is a doctest block.

Block quotes are just:
    Indented paragraphs,

        and they may nest.

Plain text	Typical result

| Line blocks are useful for addresses, 
| verse, and adornment-free lists. 
| 
| Each new line begins with a 
| vertical bar ("|"). 
|     Line breaks and initial indents 
|     are preserved. 
| Continuation lines are wrapped 
  portions of long lines; they begin 
| with spaces in place of vertical bars.
|

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

