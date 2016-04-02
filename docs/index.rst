Syntax details
==============

.. code:: javascript
    
    var x = function () {
    	test();
    }

.. parsed-literal::

   ( (title_, subtitle_?)?,
     decoration_?,
     (docinfo_, transition_?)?,
     `%structure.model;`_ )

"To Ma Own Beloved Lassie: A Poem on her 17th Birthday", by
Ewan McTeagle (for Lassie O'Shea):

    .. line-block::

        Lend us a couple of bob till Thursday.
        I'm absolutely skint.
        But I'm expecting a postal order and I can pay you back
            as soon as it comes.
        Love, Ewan.

.. sidebar:: Sidebar Title
   :subtitle: Optional Sidebar Subtitle

   Subsequent indented lines comprise
   the body of the sidebar, and are
   interpreted as body elements.

   .. sidebar:: Another sidebar
      :subtitle: Need this?

      This might be cool b-)

.. topic:: Topic Title

    Subsequent indented lines comprise
    the body of the topic, and are
    interpreted as body elements.

.. figure:: _static/images/songoku.jpg
   :scale: 50 %
   :align: center
   :alt: map to buried treasure

   This is the caption of the figure (a simple paragraph).

   The legend consists of all elements after the caption.  In this
   case, the legend consists of this paragraph and the following
   table:

   +-----------------------+-----------------------+
   | Symbol                | Meaning               |
   +=======================+=======================+
   | .. image:: tent.png   | Campground            |
   +-----------------------+-----------------------+
   | .. image:: waves.png  | Lake                  |
   +-----------------------+-----------------------+
   | .. image:: peak.png   | Mountain              |
   +-----------------------+-----------------------+

Begin another paragraph.

.. image:: _static/images/songoku.jpg
   :width: 50%
   :alt: alternate text

.. admonition:: And, by the way...

   You can make up your own admonition too.

.. note:: This is a note admonition.
   This is the second line of the first paragraph.

   - The note contains all indented body elements
     following.
   - It includes this bullet list.

.. attention::
   Beware killer rabbits!

.. caution::
   Beware killer rabbits!

.. danger::
   Beware killer rabbits!

.. error::
   Beware killer rabbits!

.. hint::
   Beware killer rabbits!

.. important::
   Beware killer rabbits!

.. note::
   Beware killer rabbits!

.. tip::
   Beware killer rabbits!

.. warning::
   Beware killer rabbits!
