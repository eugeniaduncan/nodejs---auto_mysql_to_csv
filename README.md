
# /* About auto_mysql_to_csv.js */

Summary:

I created this program for an IT colleague who needed to propose an outside-the-box yet simple way to temporarily store database generated CSV files periodically updated on a server with no major language packages (PHP, Python, Java, etc.), and in addition, no cron job permissions.

This program provided a means to achieve the goal of using an available server-side program (NodeJS) to capture info from the database every four hours, despite all of the limitations at that time.

The attached csv file (db_output.csv) is a demo of possible output from any database.  It is literal sample output from a test database on my local machine.
