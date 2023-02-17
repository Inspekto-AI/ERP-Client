import usbrelay_py
import time

count = usbrelay_py.board_count()
boards = usbrelay_py.board_details()

for board in boards:
    relay = 1
    while(relay < board[1]+1):
        result = usbrelay_py.board_control(board[0],relay,0)
        relay += 1
