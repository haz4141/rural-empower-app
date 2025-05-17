import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite } from '@capacitor-community/sqlite';

let sqlite;
let db;

export async function initDB() {
  if (Capacitor.getPlatform() === 'web') {
    console.log('SQLite is not supported on web.');
    return;
  }

  sqlite = new SQLiteConnection(CapacitorSQLite);

  const isConn = (await sqlite.isConnection('ruralDB', false)).result;

  if (!isConn) {
    db = await sqlite.createConnection('ruralDB', false, 'no-encryption', 1);
    await db.open();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS community_projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TEXT
      );
    `);
    console.log('Database and table ready!');
  } else {
    db = await sqlite.retrieveConnection('ruralDB', false);
  }
}

export async function saveProject(title, description) {
  if (!db) return;
  const createdAt = new Date().toISOString();
  await db.run(
    'INSERT INTO community_projects (title, description, created_at) VALUES (?, ?, ?)',
    [title, description, createdAt]
  );
}

export async function getProjects() {
  if (!db) return { values: [] };
  const result = await db.query('SELECT * FROM community_projects');
  return result;
}

export async function deleteProject(id) {
  if (!db) return;
  await db.run('DELETE FROM community_projects WHERE id = ?', [id]);
}
