Overview
========

- `A HYPERLINK`_
- `a    hyperlink`_
- `A
  Hyperlink`_

.. _a hyperlink: http://google.com

Want to learn about `my favorite programming language`_?

.. _my favorite programming language: http://www.python.org

:Hello: This field has a short field name, so aligning the field
        body with the first line is feasible.

:Number-of-African-swallows-required-to-carry-a-coconut: It would
    be very difficult to align the field body with the left edge
    of the first line.  It may even be preferable not to begin the
    body on the same line as the marker.

- This is the first line of a bullet list
  item's paragraph.  All lines must align
  relative to the first line.  [1]_

      This indented paragraph is interpreted
      as a block quote.

Because it is not sufficiently indented,
this paragraph does not belong to the list
item.

.. [1] Here's a footnote.  The second line is aligned
   with the beginning of the footnote label.  The ".."
   marker is what determines the indentation.

This is a paragraph.  The lines of
this paragraph are aligned at the left.

    This paragraph has problems.  The
lines are not left-aligned.  In addition
  to potential misinterpretation, warning
    and/or error messages will be generated
  by the parser.

This is a top-level paragraph.

    This paragraph belongs to a first-level block quote.

        This paragraph belongs to a second-level block quote.

Another top-level paragraph.

        This paragraph belongs to a second-level block quote.

    This paragraph belongs to a first-level block quote.  The
    second-level block quote above is inside this first-level
    block quote.

This is a top-level paragraph.

 This paragraph belongs to a first-level block quote.

  This paragraph belongs to a first-level block quote.

   This paragraph belongs to a first-level block quote.

    This paragraph belongs to a first-level block quote.

    Paragraph 2 of the first-level block quote.

.. _Python: http://www.python.org

.. _example:

The "_example" target above points to this paragraph.

.. [CIT2002] Just like a footnote, except the label is
   textual.

.. [1] A footnote contains body elements, consistently
   indented by at least 3 spaces.

====================  ==========  ==========
Header row, column 1  Header 2    Header 3
====================  ==========  ==========
body row 1, column 1  column 2    column 3
body row 2            Cells may span columns
====================  ======================

+------------------------+------------+----------+
| Header row, column 1   | Header 2   | Header 3 |
+========================+============+==========+
| body row 1, column 1   | column 2   | column 3 |
+------------------------+------------+----------+
| body row 2             | Cells may span        |
+------------------------+-----------------------+

>>> print 'Python-specific usage examples; begun with ">>>"'
Python-specific usage examples; begun with ">>>"
>>> print '(cut and pasted from interactive Python sessions)'
(cut and pasted from interactive Python sessions)

Block quotes consist of indented body elements:

    This theory, that is mine, is mine.

    -- Anne Elk (Miss)

Literal blocks are either indented or line-prefix-quoted blocks,
and indicated with a double-colon ("::") at the end of the
preceding paragraph (right here -->)::

    if literal_block:
        text = 'is left as-is'
        spaces_and_linebreaks = 'are preserved'
        markup_processing = None

:what: Field lists map field names to field bodies, like
       database records.  They are often part of an extension
       syntax.

:how: The field marker is a colon, the field name, and a
      colon.

      The field body may contain one or more body elements,
      indented relative to the field marker.

Paragraphs contain text and may contain inline markup:
*emphasis*, **strong emphasis**, `interpreted text`, ``inline
literals``, standalone hyperlinks (http://www.python.org),
external hyperlinks (Python_), internal cross-references
(example_), footnote references ([1]_), citation references
([CIT2002]_), substitution references (|example|), and _`inline
internal targets`.

Paragraphs are separated by blank lines and are left-aligned.