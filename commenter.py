import os

def comment_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already commented
    if content.startswith('"""') and content.endswith('"""'):
        return

    with open(path, 'w', encoding='utf-8') as f:
        f.write('"""\n')
        f.write(content)
        f.write('\n"""')
    print(f"Commented {path}")

# Files to comment in root
root_files = [
    'backend_test.py', 'comprehensive_backend_test.py', 
    'comprehensive_database_test.py', 'current_state_test.py', 
    'enhanced_backend_test.py'
]

for file in root_files:
    if os.path.exists(file):
        comment_file(file)

# Files to comment in backend
backend_dir = 'backend'
keep_files = ['migrate_to_supabase.py'] # keep this one just in case they need to re-run

for file in os.listdir(backend_dir):
    if file.endswith('.py') and file not in keep_files:
        comment_file(os.path.join(backend_dir, file))
