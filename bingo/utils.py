from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Spacer, PageBreak, Table, TableStyle
from reportlab.lib import colors

import random

def ticket_generator():
    """
    Bingo Ticket Generator
    Generates a random bingo ticket with 15 numbers:
    - 5 numbers per row, 3 rows per ticket, 9 columns per ticket
    Based on https://medium.com/@binoythomas1108/create-bingo-cards-using-pythons-csv-module-8bc90d0538c3
    """
    
    # Define the pattern for the number of entries in each column
    pattern = [[0,0,1],
               [0,1,0],
               [1,0,1],
               [1,0,0],
               [1,1,0],
               [1,1,0],
               [0,0,1],
               [0,1,1],
               [1,1,1]]
    random.shuffle(pattern)
    
    # Generate number ranges for each column
    number_ranges  = [list(range(1,10)), list(range(10,20)), list(range(20,30)), 
                      list(range(30,40)), list(range(40,50)), list(range(50,60)), 
                      list(range(60,70)), list(range(70,80)), list(range(80,91))]
    
    
    # Shuffle and assign numbers to the columns based on the pattern
    ticket = [["" for _ in range(3)] for _ in range(9)]
    for col in range(9):
        num_count = pattern[col].count(1)
        column_numbers = random.sample(number_ranges[col], num_count)
        column_numbers.sort()
        
        index = 0
        for row in range(3):
            if pattern[col][row] == 1:
                ticket[col][row] = str(column_numbers[index])
                index += 1

    return ticket

def transpose(matrix):
    return [[row[i] for row in matrix] for i in range(3)]

def create_ticket_element():
    data = ticket_generator()
    data = transpose(data)
    
    my_table_style = TableStyle([
                                ('INNERGRID', (0,0), (-1,-1), 2, colors.black),
                                ('BOX', (0,0), (-1,-1), 5, colors.black),
                                ('ALIGN',(0,0),(-1,-1),'CENTER'),
                                ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
                                ("TOPPADDING", (0, 0), (-1, -1), 0),
                                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                                ("FONTNAME", (0, 0), (-1, -1), "Courier-Bold"),
                                ("FONTSIZE", (0, 0), (-1, -1), 32),
                                ("LEADING", (0, 0), (-1, -1), 32)
                                ])
    
    table = Table(data, colWidths=2*cm, rowHeights=2*cm)
    table.setStyle(my_table_style)
    
    # Apply special style to cells containing "69" hehe
    for row_idx, row in enumerate(data):
        for col_idx, cell in enumerate(row):
            if cell == "69":
                special_style = TableStyle([("FONTNAME", (col_idx, row_idx), (col_idx, row_idx), "Times-Italic")])
                table.setStyle(special_style)
    return table
    

def PDF_ticket_generator(number_of_tickets):
    """
    Generate a PDF with number_of_tickets bingo tickets
    """
    # Create a list of tickets
    document = []
    
    for i in range(number_of_tickets):
        table = create_ticket_element()
        document.append(table)
        
        # Add a page break after every 3 tickets
        if i % 4 == 3:
            document.append(PageBreak())
        else: 
            document.append(Spacer(1, 1*cm))
       
    SimpleDocTemplate("bingo_tickets.pdf", 
                      pagesize=A4,
                      topMargin=1*cm,
                      bottomMargin=1*cm,
                      leftMargin=1*cm,
                      rightMargin=1*cm).build(document)