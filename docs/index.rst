Contents
========

.. toctree::
   :maxdepth: 2
   :numbered:
   :caption: Caption?

   modules/tools/tools

.. highlight:: javascript 
   :lineno-start: 10

.. code-block:: python
   :caption: this.py
   :name: this-py

   print 'Explicit is better than implicit.'

Code::

    var x = function () {
        return 1;
    };

.. productionlist::
   try_stmt: try1_stmt | try2_stmt
   try1_stmt: "try" ":" `suite`
            : ("except" [`expression` ["," `target`]] ":" `suite`)+
            : ["else" ":" `suite`]
            : ["finally" ":" `suite`]
   try2_stmt: "try" ":" `suite`
            : "finally" ":" `suite`

.. glossary::

   term 1 : A
   term 2 : B
      Definition of both terms.

.. glossary::

   term 1
   term 2
      Definition of both terms.

.. glossary::

   environment
      A structure where information about all documents under the root is
      saved, and used for cross-referencing.  The environment is pickled
      after the parsing stage, so that successive runs only need to read
      and parse new and changed documents.

   source directory
      The directory which, including its subdirectories, contains all
      source files for one Sphinx project.

.. hlist::
   :columns: 3

   * A list of
   * short items
   * that should be
   * displayed
   * horizontally

.. centered:: LICENSE AGREEMENT

.. rubric:: title

.. seealso:: modules :py:mod:`zipfile`, :py:mod:`tarfile`

.. seealso::

   Module :py:mod:`zipfile`
      Documentation of the :py:mod:`zipfile` standard module.

   `GNU tar manual, Basic Tar Format <http://link>`_
      Documentation for tar archive files, including GNU tar extensions.

.. deprecated:: 3.1
   Use :func:`spam` instead.

.. deprecated:: 2.5
   The *spam* parameter.

* this is
* a list

  * with a nested list
  * and some subitems

* and here the parent list continues

| These lines are
| broken exactly like in
| the source file.

This is a normal text paragraph. The next paragraph is a code sample::

   It is not processed in any way, except
   that the indentation is removed.

   It can span multiple lines.

This is a normal text paragraph again.

.. function:: foo(x)
              foo(y, z)
   :module: some.module.name

   Return a line of text input from the user.

Lorem ipsum [#f1]_ dolor sit amet ... [#f2]_

.. rubric:: Footnotes

.. [#f1] Text of the first footnote.
.. [#f2] Text of the second footnote.

Lorem ipsum [Ref]_ dolor sit amet.

.. [Ref] Book or article reference, URL or whatever.