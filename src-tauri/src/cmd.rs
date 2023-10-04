use std;

#[tauri::command]
pub fn open_folder(folder_path: String) -> Result<Vec<String>, String> {
    let mut files = Vec::new();
    for entry in std::fs::read_dir(folder_path).unwrap() {
        let entry = entry.unwrap();
        println!("{:?}", entry.path());
        let path = entry.path();
        if path.is_dir() {
            files.push(path.file_name().unwrap().to_str().unwrap().to_string());
        }
    }
    Ok(files)
}
