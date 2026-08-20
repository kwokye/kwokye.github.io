import http.server
import socketserver
import webbrowser
import socket
import sys

def find_free_port(start_port=8000):
    port = start_port
    while port < 9000:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
            port += 1
    return start_port

def start_server():
    port = find_free_port(8000)
    handler = http.server.SimpleHTTPRequestHandler
    
    # Enable CORS and disable cache during local preview
    class CustomHandler(handler):
        def end_headers(self):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
            self.send_header('Access-Control-Allow-Origin', '*')
            super().end_headers()

    with socketserver.TCPServer(("", port), CustomHandler) as httpd:
        url = f"http://127.0.0.1:{port}"
        print(f"\n========================================================")
        print(f"  学术主页本地预览服务已启动！")
        print(f"  请在浏览器访问: {url}")
        print(f"  提示: 修改 content/*.md 文件后，直接刷新浏览器页面即可看到最新效果。")
        print(f"  按 Ctrl + C 可退出预览服务。")
        print(f"========================================================\n")
        
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n本地预览服务已关闭。")
            sys.exit(0)

if __name__ == "__main__":
    start_server()
